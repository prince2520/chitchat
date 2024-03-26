import { useSelector } from "react-redux";
import { useContext } from "react";

import Lottie from "lottie-react";

import SocketContext from "../../context/socketContext";
import Ringtone from "../../assests/audio/ringtone.mp3";
import ImageConatainer from "../ImageContainer/ImageContainer";
import OutgoingTone from "../../assests/audio/outgoing_tone.mp3";
import VideoChatSettings from "./VideoChatSettings/VideoChatSettings";

import { callingType } from "../../constants/constants";

import AudioWave from "../../assests/animations/AudioWave.json"

import "./VideoChat.css";

const CallUser = () => {
  const videoAudioCall = useSelector((state) => state.videoAudioCall);

  return (
    <div className="flex-center call-user" style={{ flexDirection: "column" }}>
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
  const { myVideo, userVideo } = useContext(SocketContext);

  const videoAudioCall = useSelector((state) => state.videoAudioCall);

  return (
    <div className="flex-center video-chat-container box-shadow border">
      {(!videoAudioCall.callAccepted ||
        videoAudioCall.callData.callingType === callingType[1]) && (
        <CallUser
          isCalling={videoAudioCall.isCalling}
          callData={videoAudioCall.callData}
        />
      )}
      {videoAudioCall.callAccepted && (videoAudioCall.callData.callingType === callingType[1]) &&  <Lottie style={{ width : "100%", height:"2rem" }}loop={true} animationData={AudioWave}/>}
      <div
        className="video-chat-window"
        style={{ display: !videoAudioCall.callAccepted ? "none" : "flex" }}
      >
        {videoAudioCall.callData.callingType === callingType[0] && (
          <div className="flex-center video-chat__window__profile">
            <ImageConatainer
              width="1.75rem"
              height="1.75rem"
              highResUrl={videoAudioCall.callData.data.user.highResUrl}
              lowResUrl={videoAudioCall.callData.data.user.lowResUrl}
            />
            <h6 className="color-text">
              {videoAudioCall.callData.data.user.name}
            </h6>
          </div>
        )}
        <video
          style={{
            display:
              videoAudioCall.callData.callingType === callingType[1]
                ? "none"
                : "block",
          }}
          className="border my__video"
          playsInline
          autoPlay
          muted
          ref={myVideo}
        />
        <video
          style={{
            display:
              videoAudioCall.callData.callingType === callingType[1]
                ? "none"
                : "block",
          }}
          className="border user__video"
          playsInline
          autoPlay
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
