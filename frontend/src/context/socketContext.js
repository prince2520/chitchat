import { useDispatch } from "react-redux";
import React, { useEffect, useContext, useState, useRef } from "react";

import {
  disconnectSocket,
  getCall,
  getCallAcceptedHandler,
  getChatMessage,
  initiateSocket,
  sendAnswerCallHandler,
  sendCallUserHandler,
  getPrivateChat,
  socketGetRemoveChat,
  socketGetRemoveGroup,
  socketGetUpdateGroup
} from "../socket";

import AuthContext from "./authContext";

import Peer from "simple-peer";
import { useSelector } from "react-redux";
import { UserActions } from "../store/userSlice";
import { OverlayActions } from "../store/overlaySlice";

const SocketContext = React.createContext({});

export const SocketContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [myStream, setMyStream] = useState();
  const [callDetail, setCallDetail] = useState({});
  const selectedId = useSelector((state) => state.user.selectedId);

  const connectionRef = useRef();
  const myVideo = useRef(null);
  const userVideo = useRef();

  useEffect(() => {
    initiateSocket(authCtx?.userId);

    return () => {
      disconnectSocket(authCtx?.userId);
    };
  }, [authCtx?.userId, dispatch]);

  useEffect(() => {
    getChatMessage((err, { data }) => {
      dispatch(UserActions.saveMessage(data));
    });
    getPrivateChat((err, { data }) => {
      dispatch(UserActions.addPrivate(data.private));
    });
    socketGetRemoveGroup((err, {data})=>{
      dispatch(UserActions.removeUserGroup(data));
    });
    socketGetUpdateGroup((err, {data})=>{
      dispatch(UserActions.editGroup(data));
    })
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

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, myStream });

    peer?.on("signal", (data) => {
      sendAnswerCallHandler({ data, call: callDetail });
    });

    peer?.on("stream", (userStream) => {
      userVideo.current.srcObject = userStream;
    });

    peer.signal(callDetail.signal);

    connectionRef.current = peer;
  };

  useEffect(() => {
    getCall((err, callDetail) => {
      setCallAccepted(true);
      setCallDetail(callDetail);
    });
  }, []);

  const callUser = (userId) => {
    const peer = new Peer({ initiator: true, trickle: false, myStream });

    peer.on("signal", (data) => {
      sendCallUserHandler({
        userToCall: userId,
        signalData: data,
        from: authCtx.userId,
        name: authCtx.userId,
      });
    });

    peer.on("stream", (userStream) => {
      userVideo.current.srcObject = userStream;
    });

    getCallAcceptedHandler((signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;

    dispatch(OverlayActions.openVideoChatHandler());
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        getUserMedia,
        callDetail,
        callAccepted,
        myVideo,
        userVideo,
        myStream,
        callEnded,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};



export default SocketContext;
