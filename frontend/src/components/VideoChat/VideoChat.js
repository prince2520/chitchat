import { useContext, useEffect} from "react";
import SocketContext from "../../context/socketContext";
import ImageConatainer from "../ImageContainer/ImageContainer";
import VideoChatSettings from "./VideoChatSettings/VideoChatSettings";

import { useSelector } from "react-redux";
import OutgoingTone from "../../assests/audio/outgoing_tone.mp3";
import Ringtone from "../../assests/audio/ringtone.mp3";

import "./VideoChat.css";

const CallUser = ({  user }) => {
  const videoAudioCall = useSelector((state) => state.videoAudioCall);

  useEffect(() => {}, []);

  return (
    <div className="flex-center call-user">
      <ImageConatainer
        width="6rem"
        height="6rem"
        highResUrl={user.highResUrl}
        lowResUrl={user.lowResUrl}
      />
      <h5>{user.name}</h5>
      <p>{user.email}</p>
    </div>
  );
};

const VideoChat = () => {
  const { getUserMedia, myVideo, userVideo } = useContext(SocketContext);

  const videoAudioCall = useSelector((state) => state.videoAudioCall);

  useEffect(() => {
    getUserMedia();
    return () => {};
  }, []);

  return (
    <div className="video-chat-container box-shadow border">
      <div className="video-chat-window">
        {/* {<video playsInline muted ref={myVideo} autoPlay />} */}
        {videoAudioCall.callAccepted && (
          <video playsInline height={100} muted ref={userVideo} />
        )}
      </div>
      {(videoAudioCall.isCalling || videoAudioCall.isReceivingCall) && (
        <CallUser
          isCalling={videoAudioCall.isCalling}
          user={videoAudioCall.callingDetails}
        />
      )}
      <VideoChatSettings isReceivingCall={ videoAudioCall.isReceivingCall} />
      {videoAudioCall.isCalling && <audio src={OutgoingTone} autoPlay loop />}
      {videoAudioCall.isReceivingCall && <audio src={Ringtone} autoPlay loop />}
    </div>
  );
};

export default VideoChat;
