import { Icon } from "@iconify/react";
import { useState, useContext } from "react";
import { useSelector } from "react-redux";

import Button from "../../Button/Button";
import SocketContext from "../../../context/socketContext";

import "./VideoChatSettings.css";

const VideoChatSettings = ({ isReceivingCall = false }) => {
  const socketCtx = useContext(SocketContext);

  const [audioMuted, isAudioMuted] = useState(false);
  const [videoMuted, isVideoMuted] = useState(false);

  const { getUserMedia } = useContext(SocketContext);

  const videoAudioCall = useSelector((state) => state.videoAudioCall);

  return (
    <div className="flex-center video-chat-settings">
      <Button
        width={"fit-content"}
        onClick={() => {
          socketCtx.endCall(videoAudioCall.callData.data.user._id);
        }}
      >
        <Icon className="color-text" icon="fluent:call-end-24-filled" />
        <p className="color-text">End</p>
      </Button>
      {isReceivingCall && !videoAudioCall.callAccepted && (
        <Button
          onClick={() => {
            socketCtx.acceptCall();
          }}
          backgroundColor={"var(--success)"}
          width={"fit-content"}
        >
          <Icon className="color-text" icon="fluent:call-16-filled" />
          <p className="color-text">Accept</p>
        </Button>
      )}
    </div>
  );
};

export default VideoChatSettings;
