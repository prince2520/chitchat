import {Icon} from "@iconify/react";
import ReactPlayer from 'react-player';
import React, {useCallback, useEffect, useState} from "react";

import './MessageVideo.css';
import {useInView} from "react-intersection-observer";

const MessageVideo = ({url, time}) => {


    const [blurImg, setBlurImg] = useState(false);

    const {ref, inView} = useInView({
        threshold: 0.1,
        delay: 100,
    });

    useEffect(() => {
        setBlurImg(!inView);
    }, [inView]);


    const [showControls, setShowControls] = useState(false);

    const dontShowControlsHandler = useCallback(()=>{
        setShowControls(false);
    },[])

    const showControlsHandler = useCallback(()=>{
        setShowControls(true);
    },[])


    return (
        <div
            ref={ref}
            className='video-message chat-msg-background media-container'
             onMouseOver={()=>showControlsHandler()}
             onMouseLeave={()=>dontShowControlsHandler()}>
            <ReactPlayer
                style={{filter: `blur(${blurImg? 5: 0 }px)`}}
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