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
      <div className={"flex-center video-chat-video-mute cursor-btn"}>
        <div
          className="setting-container flex-center"
          onClick={() => {
            isVideoMuted((prevState) => {
              getUserMedia(!prevState, audioMuted);
              return !prevState;
            });
          }}
        >
          <Icon
            icon={
              !videoMuted ? "ic:baseline-videocam" : "ic:sharp-videocam-off"
            }
          />
        </div>
      </div>
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
          onClick={() =>{
            socketCtx.acceptCall()}}
          backgroundColor={"var(--success)"}
          width={"fit-content"}
        >
          <Icon className="color-text" icon="fluent:call-16-filled" />
          <p className="color-text">Accept</p>
        </Button>
      )}
      <div className="video-chat-audio-mute cursor-btn">
        <div
          className="setting-container flex-center"
          onClick={() =>
            isAudioMuted((prevState) => {
              getUserMedia(videoMuted, !prevState);
              return !prevState;
            })
          }
        >
          <Icon
            icon={
              !audioMuted
                ? "ant-design:audio-muted-outlined"
                : "ant-design:audio-outlined"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default VideoChatSettings;
