import {Icon} from "@iconify/react";
import ReactPlayer from 'react-player';
import {useInView} from "react-intersection-observer";
import React, {useCallback, useEffect, useState} from "react";

import './MessageVideo.css';

const MessageVideo = ({url, time}) => {
    const [play, setPlay] = useState(false);

    const {ref, inView} = useInView({
        threshold: 0.1,
        delay: 100,
    });

    useEffect(() => {
        if(!inView){
            setPlay(false);
        }
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
                playing={play}
                width={"100%"}
                height={"100%"}
                url={url}
                controls={showControls}/>
            <div className={'image-bottom'}>
                <Icon icon="akar-icons:video" />
                <h6>{time}</h6>
            </div>
        </div>
    );
};

export default React.memo(MessageVideo);