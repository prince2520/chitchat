import React, {useEffect, useState} from "react";
import {Icon} from "@iconify/react";

import ModalImage from "react-modal-image";

import './MessageImage.css';


const MessageImage = ({myMsg, imageSrc, time}) => {

    return (
        <div
            className={'send-img chat-msg-background media-container'}
            style={{
                borderColor: myMsg && 'var(--white)',
                alignSelf: !myMsg && 'flex-start'
            }}>
            <ModalImage
                small={imageSrc}
                medium={imageSrc}
                hideDownload={true}
                showRotate={true}
            />
            <div className={'image-bottom'}>
                <Icon icon="typcn:image"/>
                <span className={'msg-time'}>{time}</span>
            </div>
        </div>
    );
};

export default React.memo(MessageImage);