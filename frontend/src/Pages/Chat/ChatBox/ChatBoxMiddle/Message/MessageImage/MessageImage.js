import React, {useEffect, useState} from "react";
import {Icon} from "@iconify/react";

import './MessageImage.css';
import {useInView} from "react-intersection-observer";
import {useStore} from "react-redux";

const MessageImage = ({myMsg, imageSrc, time}) => {

    const [blurImg, setBlurImg] = useState(false);

    const {ref, inView} = useInView({
        threshold: 0.1,
        delay: 100,
    });

    useEffect(() => {
        setBlurImg(!inView);
    }, [inView]);

    return (
        <div
            ref={ref}
            className={'send-img chat-msg-background media-container'}
            style={{
                borderColor: myMsg && 'var(--white)',
                alignSelf: !myMsg && 'flex-start'
            }}>
            <img className={'cursor-btn'} alt={'send-message'} style={{filter: `blur(${blurImg? 5: 0 }px)`}} src={imageSrc}/>
            <div className={'image-bottom'}>
                <Icon icon="typcn:image"/>
                <span className={'msg-time'}>{time}</span>
            </div>
        </div>
    );
};

export default React.memo(MessageImage);