import {useDispatch} from "react-redux";
import React, {useEffect, useContext, useState, useRef} from "react";

import {
    disconnectSocket,
    getCall,
    getCallAcceptedHandler,
    getChatMessage,
    initiateSocket,
    sendAnswerCallHandler,
    sendCallUserHandler
} from "../socket";

import AuthContext from "./authContext";
import {HelperActions} from "../store/helper";

import Peer from "simple-peer";
import { OverlayActions } from "../store/overlay";
import { UserActions } from "../store/user";

const SocketContext = React.createContext({});

export const SocketContextProvider = ({children}) => {
    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);

    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [myStream, setMyStream] = useState();
    const [callDetail, setCallDetail] = useState({});

    const connectionRef = useRef();
    const myVideo = useRef(null);
    const userVideo = useRef();


    useEffect(() => {
        initiateSocket(authCtx?.userId);

        return () => {
            dispatch(HelperActions.dropDownHandler(false));
            disconnectSocket(authCtx?.userId)
        }
    }, [authCtx?.userId])


    useEffect(() => {
        getChatMessage((err, {data}) => {
            dispatch(UserActions.saveMessage(data));
        });
    }, []);

    const getUserMedia = async ( ) => {
        let mediaStream = null;
        try {
            mediaStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
            myVideo.current.srcObject = mediaStream;
            setMyStream(mediaStream);
        } catch (err) {
            console.log(err);
        }
    };

    const stopAudioVideo = async () => {
        
    }

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({initiator: false, trickle: false, myStream});

        peer?.on('signal', (data) => {
            sendAnswerCallHandler({data, call: callDetail});
        });

        peer?.on('stream', (userStream) => {
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
        const peer = new Peer({initiator: true, trickle: false, myStream});

        peer.on('signal', (data) => {
            sendCallUserHandler({
                userToCall: userId,
                signalData: data,
                from: authCtx.userId,
                name: authCtx.userId
            });
        });

        peer.on('stream', (userStream) => {
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
        <SocketContext.Provider value={{
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
        }}>
            {children}
        </SocketContext.Provider>
    )
}


export default SocketContext;