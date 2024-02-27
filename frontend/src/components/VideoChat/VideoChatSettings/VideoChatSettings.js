import { Icon } from "@iconify/react";

import "./VideoChatSettings.css";
import { useState, useContext } from "react";
import SocketContext from "../../../context/socketContext";



const VideoChatSettings = () => {
  const [audioMuted, isAudioMuted] = useState(false);  
  const [videoMuted, isVideoMuted] = useState(false);

  const {getUserMedia} = useContext(SocketContext);


  return (
    <div className="video-chat-settings">
      <div className={'video-chat-video-mute cursor-btn'}>
        <div className="setting-container flex-center" onClick={()=>{
            
            isVideoMuted((prevState)=>{
                getUserMedia(!prevState, audioMuted)
                return !prevState})}}>
          <Icon icon={!videoMuted ? "ic:baseline-videocam": "ic:sharp-videocam-off"} />
        </div>
      </div>
      <div className="video-chat-call-hangout cursor-btn">
        <div className="setting-container flex-center">
          <Icon icon="fluent:call-16-filled"/>
        </div>
        <h6>Call</h6>
      </div>
      <div className= "video-chat-audio-mute cursor-btn">
        <div className="setting-container flex-center" onClick={()=>isAudioMuted((prevState)=>{
            getUserMedia(videoMuted, !prevState)
            return !prevState})}>
          <Icon icon={!audioMuted ? "ant-design:audio-muted-outlined" : "ant-design:audio-outlined"}/>
        </div>
      </div>
    </div>
  );
};

export default VideoChatSettings;
