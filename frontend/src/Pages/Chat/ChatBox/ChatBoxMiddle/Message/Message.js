import React from "react";
import {Icon} from "@iconify/react";

import date from 'date-and-time';

import MessageImage from "./MessageImage/MessageImage";
import MessageString from "./MessageString/MessageString";
import MessageOther from "./MessageOther/MessageOther";
import MessageAudio from "./MessageAudio/MessageAudio";
import MessageVideo from "./MessageVideo/MessageVideo";
import ImageContainer from "../../../../../Helper/ImageContainer/ImageContainer";

import './Message.css'

const Message = ({myMsg, messageDetail, id}) => {

    const printHandler = (messageDetail) => {
        let message, createdTime, time;

        createdTime = new Date(messageDetail.createdAt);

        time = date.format(createdTime, 'h:mm A');

        switch (messageDetail.messageType){
            case "string":
                message = (<MessageString message={messageDetail.message} time={time}/>) ;
                break;
            case "audio":
                message = (<MessageAudio url={messageDetail.url}/>);
                break;
            case "image":
                message = (<MessageImage time={time} myMsg={myMsg} imageSrc={messageDetail.url}/>);
                break;
            case "video":
                message = (<MessageVideo url={messageDetail.url} time={time}/>);
                break;
            default:
                message = (<MessageOther myMsg={myMsg} messageDetail={messageDetail}/>);
        };

        return message;
    }

    return (
        <div
            id={id}
            className={`message-container ${myMsg && 'my-message'}`}>
            {!myMsg && <div className={`message-img-container`}>
                <ImageContainer src={messageDetail.profileImageUrl}/>
            </div>}
            <div
                className={`message-box ${messageDetail.isOpenAIMsg && 'open-ai-msg-box'}`}>
                {!myMsg && <span className={'username'}>{messageDetail.username}</span>}
                {printHandler(messageDetail)}
            </div>
            {messageDetail.isOpenAIMsg &&
                <div className={'open-ai-icon'}>
                    <Icon icon="ri:openai-fill"/>
                </div>}
        </div>
    );
};

export default React.memo(Message);