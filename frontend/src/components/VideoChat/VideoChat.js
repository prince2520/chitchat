import { useSelector } from "react-redux";
import { useContext, useEffect } from "react";

import SocketContext from "../../context/socketContext";
import ImageConatainer from "../ImageContainer/ImageContainer";
import VideoChatSettings from "./VideoChatSettings/VideoChatSettings";

import OutgoingTone from "../../assests/audio/outgoing_tone.mp3";
import Ringtone from "../../assests/audio/ringtone.mp3";

import "./VideoChat.css";

const CallUser = ({ callData }) => {
  return (
    <div className="flex-center call-user">
      <ImageConatainer
        width="6rem"
        height="6rem"
        highResUrl={callData.data.user.highResUrl}
        lowResUrl={callData.data.user.lowResUrl}
      />
      <h5>{callData.data.user.name}</h5>
      <p>{callData.data.user.email}</p>
    </div>
  );
};

const VideoChat = () => {
  const { myVideo, userVideo, stream, getUserMedia } =
    useContext(SocketContext);

  const videoAudioCall = useSelector((state) => state.videoAudioCall);

  return (
    <div className="video-chat-container box-shadow border">
      <div className="video-chat-window">
        <video
          playsInline
          width={500}
          height={200}
          autoPlay
          muted
          ref={myVideo}
        />

        <video
          playsInline
          width={500}
          height={200}
          autoPlay
          muted
          ref={userVideo}
        />
      </div>
      {(videoAudioCall.isCalling || videoAudioCall.isReceivingCall) && (
        <CallUser
          isCalling={videoAudioCall.isCalling}
          callData={videoAudioCall.callData}
        />
      )}
      <VideoChatSettings isReceivingCall={videoAudioCall.isReceivingCall} />
      {videoAudioCall.isCalling && <audio src={OutgoingTone} autoPlay loop />}
      {videoAudioCall.isReceivingCall && <audio src={Ringtone} autoPlay loop />}
    </div>
  );
};

export default VideoChat;
