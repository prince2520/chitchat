import {Icon} from "@iconify/react";
import ReactPlayer from 'react-player';
import React, {useCallback, useState} from "react";

import './MessageVideo.css';

const MessageVideo = ({url, time}) => {
    const [showControls, setShowControls] = useState(false);

    const dontShowControlsHandler = useCallback(()=>{
        setShowControls(false);
    },[])

    const showControlsHandler = useCallback(()=>{
        setShowControls(true);
    },[])


    return (
        <div className='video-message chat-msg-background media-container'
             onMouseOver={()=>showControlsHandler()}
             onMouseLeave={()=>dontShowControlsHandler()}>
            <ReactPlayer
                width={"100%"}
                height={"100%"}
                url={url}
                controls={showControls}/>
            <div className={'image-bottom'}>
                <Icon icon="akar-icons:video" />
                <span className={'msg-time'}>{time}</span>
            </div>
        </div>
    );
};

export default React.memo(MessageVideo);