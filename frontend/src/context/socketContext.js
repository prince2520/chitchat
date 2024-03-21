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
  socketGetEndCall,
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

  const [stream, setStream] = useState();

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
    // B ( Save 'A' Signal)
    socketGetCall((err, {callData}) => {
      dispatch(
        VideoAudioCallActions.callingHandler({
          isCalling: false,
          isReceivingCall: true,
          callData: callData
        })
      );
      dispatch(OverlayActions.openVideoChatHandler());
    });

    socketGetEndCall((err, data) => {
      dispatch(VideoAudioCallActions.callEndedHandler());
      dispatch(OverlayActions.closeOverlayHandler());
    });
  }, []);

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

    return new Promise (async (resolve, reject) => {
      try {
        mediaStream =  await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        myVideo.current.srcObject = mediaStream;
        setStream(mediaStream);
        resolve(mediaStream);
      } catch (err) {
        reject(err);
      }
    })
  };

  const callUser = async (chatId) => {

    const mediaStream = await getUserMedia();
    
    dispatch(OverlayActions.openVideoChatHandler());

    const peer = new Peer({ initiator: true, trickle: false, stream: mediaStream });

    // A -> B Signal
    peer.on("signal", (data) => {
      const callData = {
        userToCall: chatId,
        data: {
          user: user,
          signal: data
        }
      };
      socketCall(callData);
    });

    peer.on("stream", (userStream) => {
      userVideo.current.srcObject = userStream;
    });

    // B -> A ( B Signal )
    socketGetCallAccepted((err, {data}) => {
      peer.signal(data.signal);
      dispatch(VideoAudioCallActions.callAcceptedHandler());
    });

    connectionRef.current = peer;
  };

  const acceptCall = async() => {
    const mediaStream = await getUserMedia();


    const peer = new Peer({ initiator: false, trickle: false, stream: mediaStream });

    // B -> A ( B Signal)
    peer?.on("signal", (signal) => {
      socketCallAccepted({
        signal: signal,
        userToCall: videoAudioCall.callData.data.user._id
      });
    });

    peer?.on("stream", (userStream) => {
      userVideo.current.srcObject = userStream;
    });

    peer.signal(videoAudioCall.callData.data.signal);

    dispatch(
      VideoAudioCallActions.callAcceptedHandler()
    );

    connectionRef.current = peer;
  };

  const endCall = (to) => {
    dispatch(VideoAudioCallActions.callEndedHandler());

    const data = {
      callEnded: true,
      to: to,
    };

    socketEndCall(data);

    //connectionRef.current.destroy();

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
        acceptCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
