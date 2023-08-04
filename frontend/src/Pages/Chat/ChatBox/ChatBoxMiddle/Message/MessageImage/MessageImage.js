import React from "react";

import './MessageImage.css';
import {Icon} from "@iconify/react";

const MessageImage = ({myMsg, imageSrc, time}) => {
    return (
        <div
            className={'send-img chat-msg-background media-container'}
            style={{
                borderColor: myMsg && 'var(--white)',
                alignSelf: !myMsg && 'flex-start'
            }}>
            <div className={'image-fullscreen cursor-btn'}>
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