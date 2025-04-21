import { useDispatch } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify"
import Peer from "simple-peer";

import {
  socketInitiate,
  socketDisconnect,
  socketGetSendMessage,
  socketGetAddPrivate,
  socketGetRemoveChat,
  socketGetRemoveUserGroup,
  socketGetUpdatedGroup,
  socketCall,
  socketGetCall,
  socketCallAccepted,
  socketGetCallAccepted,
  socketEndCall,
  socketGetEndCall,
  socketOffCallAccepted,
  socketGetUnblockUser,
  socketGetBlockUser,
  socketGetAddMemberGroup,
  socketGetLeaveMemberGroup,
  socketGetAutoLogout,
  socketJoinGroups
} from "../services/socket";


import { useSelector } from "react-redux";
import { OverlayActions } from "../redux/slice/overlaySlice";
import { VideoAudioCallActions } from "../redux/slice/videoAudioCallSlice";
import { callingType } from "../constants/constants";
import { useAuth } from "../hooks/useAuth";
import { ChatActions } from "../redux/slice/chatSlice";

const SocketContext = React.createContext({});

export const SocketContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const videoAudioCall = useSelector((state) => state.videoAudioCall);

  const [stream, setStream] = useState();
  const { logout } = useAuth();

  const user = useSelector((state) => state.user);
  const selectedId = useSelector((state) => state.chat.selectedId);
  const chat = useSelector(state => state.chat);
  const showSettings = useSelector((state) => state.overlay.showSettings);

  const userVideo = useRef(null);
  const myVideo = useRef(null);
  const connectionRef = useRef();

  useEffect(() => {
    socketInitiate(user._id);
    return () => {
      socketDisconnect({ userId: user._id });
      if (videoAudioCall.isCalling || videoAudioCall.isReceivingCall) {
        endCall(videoAudioCall.callData.userToCall);
      }
    };
  }, [user._id, dispatch]);

  useEffect(() => {
    socketJoinGroups(chat.groups);
  }, [chat.groups])

  useEffect(() => {
    socketGetSendMessage((err, { data }) => {
      dispatch(ChatActions.saveMessageReducer(data));
    });
    socketGetAddPrivate((err, { data }) => {
      dispatch(ChatActions.createPrivateReducer(data.private));
    });
    socketGetRemoveUserGroup((err, { data }) => {
      dispatch(ChatActions.deleteChatReducer({...data}));
    });
    socketGetUpdatedGroup((err, { data }) => {
      dispatch(ChatActions.updateGroupReducer({...data}));
    });
    socketGetUnblockUser((err, { data }) => {
      dispatch(ChatActions.unblockUserGroupReducer({...data}));
    });
    socketGetBlockUser((err, { data }) => {
      dispatch(ChatActions.blockUserGroupReducer({...data}));
    });
    socketGetAddMemberGroup((err, { data }) => {
      dispatch(ChatActions.addMemberGroupReducer(data));
    });
    socketGetLeaveMemberGroup((err, { data }) => {
      dispatch(ChatActions.leaveMemberGroupReducer(data));
    });
    socketGetAutoLogout((err, { userId, alreadyLogin }) => {
      if (user._id === userId && alreadyLogin) {
        toast.error('Someone login to your account!');
        logout();
      }
    })
  }, [dispatch]);

  useEffect(() => {
    // B ( Save 'A' Signal)
    socketGetCall((err, { callData }) => {
      dispatch(
        VideoAudioCallActions.callingReducer({
          isCalling: false,
          isReceivingCall: true,
          callData: callData,
        })
      );
      dispatch(OverlayActions.openVideoChatReducer());
    });

    socketGetEndCall((err, data) => {
      if (connectionRef?.current) {
        connectionRef.current.destroy();
        connectionRef.current = null;
      }

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }

      if (myVideo.current) {
        myVideo.current.srcObject = null;
      }
      if (userVideo.current) {
        userVideo.current.srcObject = null;
      }

      dispatch(VideoAudioCallActions.callEndedReducer());
      dispatch(OverlayActions.closeOverlayReducer());
    });
  }, []);

  useEffect(() => {
    socketGetRemoveChat((data) => {
      if (showSettings) {
        dispatch(OverlayActions.closeOverlayReducer());
      }
      dispatch(ChatActions.deleteChatReducer({...data}));

    });
  }, [dispatch, showSettings ]);

  const getUserMedia = async (getCallingType) => {
    const isOnVideo = getCallingType === callingType[0] ? true : false;

    return new Promise(async (resolve) => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: isOnVideo,
          audio: true,
        });
        myVideo.current.srcObject = mediaStream;
        setStream(mediaStream);
        resolve(mediaStream);
      } catch (err) {
        console.log(err);
      }
    });
  };

  const callUser = async (chatId, getCallingType = callingType[0]) => {

    const mediaStream = await getUserMedia(getCallingType);

    dispatch(OverlayActions.openVideoChatReducer());

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: mediaStream,
    });

    peer.on("close", () => {
      socketOffCallAccepted();
    });

    // A -> B Signal
    peer.on("signal", (data) => {
      const callData = {
        userToCall: chatId,
        callingType: getCallingType,
        data: {
          user: user,
          signal: data,
        },
      };
      socketCall(callData);
    });

    peer.on("stream", (userStream) => {
      userVideo.current.srcObject = userStream;
    });

    // B -> A ( B Signal )
    socketGetCallAccepted((err, { data }) => {
      peer.signal(data.signal);
      dispatch(VideoAudioCallActions.callAcceptedReducer());
    });

    connectionRef.current = peer;
  };

  const acceptCall = async (getCallingType) => {
    const mediaStream = await getUserMedia(getCallingType);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: mediaStream,
    });

    peer.on("close", () => {
      socketOffCallAccepted();
    });

    // B -> A ( B Signal)
    peer?.on("signal", (signal) => {
      socketCallAccepted({
        signal: signal,
        userToCall: videoAudioCall.callData.data.user._id,
      });
    });

    peer?.on("stream", (userStream) => {
      userVideo.current.srcObject = userStream;
    });

    peer.signal(videoAudioCall.callData.data.signal);

    dispatch(VideoAudioCallActions.callAcceptedReducer());

    connectionRef.current = peer;
  };

  const endCall = (userToCall) => {
    dispatch(VideoAudioCallActions.callEndedReducer());

    const data = {
      callEnded: true,
      userToCall: userToCall,
    };

    // Destroy peer connection
    if (connectionRef?.current) {
      connectionRef.current.destroy();
      connectionRef.current = null; // <-- clear reference
    }

    // Stop media tracks
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null); // <-- clear the state
    }

    // Clear video elements
    if (myVideo.current) {
      myVideo.current.srcObject = null;
    }
    if (userVideo.current) {
      userVideo.current.srcObject = null;
    }

    // Socket cleanup
    socketEndCall(data);
    socketOffCallAccepted();

    // UI cleanup
    dispatch(OverlayActions.closeOverlayReducer());
  };

  return (
    <SocketContext.Provider
      value={{
        getUserMedia,
        myVideo,
        userVideo,
        stream,
        callUser,
        endCall,
        acceptCall
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
