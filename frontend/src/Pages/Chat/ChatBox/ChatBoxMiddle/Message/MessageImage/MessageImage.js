import React from "react";
import {Icon} from "@iconify/react";

import './MessageImage.css';

const MessageImage = ({myMsg, imageSrc, time}) => {
    return (
        <div
            className={'send-img chat-msg-background media-container'}
            style={{
                borderColor: myMsg && 'var(--white)',
                alignSelf: !myMsg && 'flex-start'
            }}>
            <div className={'image-fullscreen cursor-btn box-shadow'}>
                <Icon icon="iconamoon:screen-full" />
            </div>
            <img alt={'send-message'} src={imageSrc}/>
            <div className={'image-bottom'}>
                <Icon icon="typcn:image"/>
                <span className={'msg-time'}>{time}</span>
            </div>
        </div>
    );
};

export default React.memo(MessageImage);