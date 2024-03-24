import { useSelector } from "react-redux";
import { useContext } from "react";

import SocketContext from "../../context/socketContext";
import ImageConatainer from "../ImageContainer/ImageContainer";
import VideoChatSettings from "./VideoChatSettings/VideoChatSettings";

import OutgoingTone from "../../assests/audio/outgoing_tone.mp3";
import Ringtone from "../../assests/audio/ringtone.mp3";

import "./VideoChat.css";

const CallUser = ({ callData }) => {
  const videoAudioCall = useSelector((state) => state.videoAudioCall);

  return (
    <div className="flex-center call-user" style={{flexDirection : 'column'}}>
      <ImageConatainer
        width="6rem"
        height="6rem"
        highResUrl={videoAudioCall.callData.data.user.highResUrl}
        lowResUrl={videoAudioCall.callData.data.user.lowResUrl}
      />
      <h5>{videoAudioCall.callData.data.user.name}</h5>
      <p>{videoAudioCall.callData.data.user.email}</p>
    </div>
  );
};

const VideoChat = () => {
  const { myVideo, userVideo, stream, getUserMedia } =
    useContext(SocketContext);

  const videoAudioCall = useSelector((state) => state.videoAudioCall);

  return (
    <div className="video-chat-container box-shadow border">
      {!videoAudioCall.callAccepted && <CallUser
        isCalling={videoAudioCall.isCalling}
        callData={videoAudioCall.callData}
      />}
      <div
        className="video-chat-window"
        style={{ display: !videoAudioCall.callAccepted ? "none" : "block" }}
      >
        <div className="flex-center video-chat__window__profile">
          <ImageConatainer
            width="1.75rem"
            height="1.75rem"
            highResUrl={videoAudioCall.callData.data.user.highResUrl}
            lowResUrl={videoAudioCall.callData.data.user.lowResUrl}
          />
          <h6 className="color-text">{videoAudioCall.callData.data.user.name}</h6>
        </div>
        <video
          className="border my__video"
          playsInline
          autoPlay
          muted
          ref={myVideo}
        />
        <video
          className="border user__video"
          playsInline
          autoPlay
          muted
          ref={userVideo}
        />
      </div>
      <VideoChatSettings isReceivingCall={videoAudioCall.isReceivingCall} />
      {!videoAudioCall.callAccepted && videoAudioCall.isCalling && (
        <audio src={OutgoingTone} autoPlay loop />
      )}
      {!videoAudioCall.callAccepted && videoAudioCall.isReceivingCall && (
        <audio src={Ringtone} autoPlay loop />
      )}
    </div>
  );
};

export default VideoChat;
