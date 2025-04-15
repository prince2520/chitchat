import { useDispatch } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import {toast} from "react-toastify"
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
  socketGetAutoLogout
} from "../services/socket";


import { useSelector } from "react-redux";
import { OverlayActions } from "../reduxs/slice/overlaySlice";
import { VideoAudioCallActions } from "../reduxs/slice/videoAudioCallSlice";
import { callingType } from "../constants/constants";
import { useAuth } from "../hooks/useAuth";
import { ChatActions } from "../reduxs/slice/chatSlice";

const SocketContext = React.createContext({});

export const SocketContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const videoAudioCall = useSelector((state) => state.videoAudioCall);

  const [stream, setStream] = useState();
  const {logout} = useAuth();

  const user = useSelector((state) => state.user);
  const selectedId = useSelector((state) => state.chat.selectedId);

  const userVideo = useRef(null);
  const myVideo = useRef(null);
  const connectionRef = useRef();

  useEffect(() => {
    socketInitiate(user._id);
    return () => {
      socketDisconnect({userId: user._id});
      if (videoAudioCall.isCalling || videoAudioCall.isReceivingCall) {
        endCall(videoAudioCall.callData.userToCall);
      }
    };
  }, [user._id, dispatch]);

  useEffect(() => {
    socketGetSendMessage((err, { data }) => {
      dispatch(ChatActions.saveMessage(data));
    });
    socketGetAddPrivate((err, { data }) => {
      dispatch(ChatActions.createPrivate(data.private));
    });
    socketGetRemoveUserGroup((err, { data }) => {
      dispatch(ChatActions.removeUserGroup(data));
    });
    socketGetUpdatedGroup((err, { data }) => {
      dispatch(ChatActions.editGroup(data));
    });
    socketGetUnblockUser((err, { data }) => {
      console.log('socketGetUnblockUser', data)
      dispatch(ChatActions.unblockUserGroup(data));
    });
    socketGetBlockUser((err, { data }) => {
      dispatch(ChatActions.blockUserGroup(data));
    });
    socketGetAddMemberGroup((err, { data }) => {
      dispatch(ChatActions.addMemberGroup(data));
    });
    socketGetLeaveMemberGroup((err, { data }) => {
      dispatch(ChatActions.leaveMemberGroup(data));
    });
    socketGetAutoLogout((err, {userId, alreadyLogin}) => {
      if(user._id === userId && alreadyLogin) {
        toast.error('Someone login to your account!');
        logout();
      }
    })
  }, [dispatch]);

  useEffect(() => {
    // B ( Save 'A' Signal)
    socketGetCall((err, { callData }) => {
      dispatch(
        VideoAudioCallActions.callingHandler({
          isCalling: false,
          isReceivingCall: true,
          callData: callData,
        })
      );
      dispatch(OverlayActions.openVideoChatHandler());
    });

    socketGetEndCall((err, data) => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      dispatch(VideoAudioCallActions.callEndedHandler());
      dispatch(OverlayActions.closeOverlayHandler());
    });
  }, []);

  useEffect(() => {
    socketGetRemoveChat((data) => {
      if (selectedId === data.chatId) {
        dispatch(
          ChatActions.selectedChat({
            selectedId: null,
            selectedType: null,
            isSelected: false,
          })
        );
      }
      dispatch(ChatActions.deleteChat(data));
    });
  }, [dispatch, selectedId]);

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

    dispatch(OverlayActions.openVideoChatHandler());

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
      dispatch(VideoAudioCallActions.callAcceptedHandler());
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

    dispatch(VideoAudioCallActions.callAcceptedHandler());

    connectionRef.current = peer;
  };

  const endCall = (userToCall) => {
    dispatch(VideoAudioCallActions.callEndedHandler());

    const data = {
      callEnded: true,
      userToCall: userToCall,
    };

    if(connectionRef?.current){
      connectionRef.current.destroy();
    }

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    socketEndCall(data);
    socketOffCallAccepted();

    dispatch(OverlayActions.closeOverlayHandler());
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
