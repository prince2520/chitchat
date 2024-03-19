import { Icon } from "@iconify/react";
import { useContext, useEffect, useRef } from "react";
import SocketContext from "../../context/socketContext";

import VideoChatSettings from "./VideoChatSettings/VideoChatSettings";

import "./VideoChat.css";

const VideoChat = () => {
  const {
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
  } = useContext(SocketContext);

  useEffect(() => {
    getUserMedia();
  }, []);

  return (
    <div className="video-chat-container box-shadow border">
      <div className="video-chat-window">
        <video playsInline muted ref={myVideo} autoPlay />
        {callAccepted && (
          <video playsInline height={100} muted ref={userVideo} />
        )}
      </div>
      <VideoChatSettings />
    </div>
  );
};

export default VideoChat;
