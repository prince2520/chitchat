import { useDispatch } from "react-redux";
import React, { useEffect, useContext, useState, useRef } from "react";

import {

  socketInitiate,
  socketDisconnect,

  socketGetChatMessage,

  socketGetPrivateChat,
  socketGetRemoveChat,
  
  socketGetRemoveGroup,
  socketGetUpdatedGroup,

  socketGetCall,
  socketCall,
  
  socketCallAccepted,
  socketGetCallAccepted,

  socketEndCall,
  socketGetEndCall

} from "../socket";

import AuthContext from "./authContext";

import Peer from "simple-peer";
import { useSelector } from "react-redux";
import { UserActions } from "../store/userSlice";
import { OverlayActions } from "../store/overlaySlice";
import { VideoAudioCallActions } from "../store/videoAudioCallSlice";

const SocketContext = React.createContext({});

export const SocketContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);

  const videoAudioCall = useSelector((state) => state.videoAudioCall);

  const [myStream, setMyStream] = useState();

  const user = useSelector((state) => state.user);
  const selectedId = useSelector((state) => state.user.selectedId);

  const userVideo = useRef(null);
  const myVideo = useRef(null);
  const connectionRef = useRef();

  // Initiate Socket
  useEffect(() => {
    socketInitiate(authCtx?.userId);
    return () => {
      socketDisconnect(authCtx?.userId);
    };
  }, [authCtx?.userId, dispatch]);

  useEffect(() => {
    socketGetChatMessage((err, { data }) => {
      dispatch(UserActions.saveMessage(data));
    });
    socketGetPrivateChat((err, { data }) => {
      dispatch(UserActions.addPrivate(data.private));
    });
    socketGetRemoveGroup((err, { data }) => {
      dispatch(UserActions.removeUserGroup(data));
    });
    socketGetUpdatedGroup((err, { data }) => {
      dispatch(UserActions.editGroup(data));
    });
  }, [dispatch]);

  useEffect(() => {
    socketGetRemoveChat((data) => {
      if (selectedId === data.chatId) {
        dispatch(
          UserActions.selectedChat({
            selectedId: null,
            selectedType: null,
            isSelected: false,
          })
        );
      }
      dispatch(UserActions.deleteChat(data));
    });
  }, [dispatch, selectedId]);

  const getUserMedia = async () => {
    let mediaStream = null;
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      myVideo.current.srcObject = mediaStream;
      setMyStream(mediaStream);
    } catch (err) {
      console.log(err);
    }
  };

  const acceptCall = () => {
    const peer = new Peer({ initiator: false, trickle: false, myStream });

    peer?.on("signal", (data) => {
      socketCallAccepted({
        signal: data,
        to: videoAudioCall.callingDetails.to
      });
    });

    peer?.on("stream", (userStream) => {
      userVideo.current.srcObject = userStream;
    });

    peer.signal(videoAudioCall.signal);

    connectionRef.current = peer;

    dispatch(
      VideoAudioCallActions.callAcceptedHandler({
        callAccepted: true
      })
    );
  };

  useEffect(() => {
    socketGetCall((err, receivingCallDetails) => {
      dispatch(
        VideoAudioCallActions.callingHandler({
          isCalling: false,
          isReceivingCall: true,
          callingDetails: receivingCallDetails.callData.data.user,
          signal: receivingCallDetails.callData.data.signal
        })
      );
      dispatch(OverlayActions.openVideoChatHandler());
    });

    socketGetEndCall((err, data) => {
      dispatch(VideoAudioCallActions.callEndedHandler());
      dispatch(OverlayActions.closeOverlayHandler());
    });

    socketGetCallAccepted((err, data) => {
      dispatch(
        VideoAudioCallActions.callAcceptedHandler({
          callAccepted: true
        })
      );
    });
  }, []);

  const callUser = (chatId) => {
    const peer = new Peer({ initiator: true, trickle: false, myStream });

    peer.on("signal", (data) => {
      const callData = {
        userToCall: chatId,
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

    socketGetCallAccepted((signal) => {
      dispatch(
        VideoAudioCallActions.callAcceptedHandler({
          callAccepted: true,
        })
      );

      peer.signal(signal);
    });

    connectionRef.current = peer;

    dispatch(OverlayActions.openVideoChatHandler());
  };

  const endCall = (to) => {
    dispatch(VideoAudioCallActions.callEndedHandler());

    const data = {
      callEnded: true,
      to: to,
    };

    socketEndCall(data);

    // connectionRef.current.destroy();

    dispatch(OverlayActions.closeOverlayHandler());
  };

  return (
    <SocketContext.Provider
      value={{
        getUserMedia,
        myVideo,
        userVideo,
        myStream,
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
