import React, {useCallback, useState} from "react";
import ReactPlayer from 'react-player';

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
            <span>{time}</span>
        </div>
    );
};

export default React.memo(MessageVideo);