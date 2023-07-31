import {Icon} from "@iconify/react";

import MessageImage from "./MessageImage/MessageImage";
import MessageString from "./MessageString/MessageString";
import MessageOther from "./MessageOther/MessageOther";
import MessageAudio from "./MessageAudio/MessageAudio";
import MessageVideo from "./MessageVideo/MessageVideo";
import ImageContainer from "../../../../../Helper/ImageContainer/ImageContainer";

import './Message.css'

const Message = ({myMsg, messageDetail}) => {

    const printHandler = (messageDetail) => {
        let message;

        switch (messageDetail.messageType){
            case "string":
                message = (<MessageString message={messageDetail.message}/>) ;
                break;
            case "audio":
                message = (<MessageAudio url={messageDetail.url}/>);
                break;
            case "image":
                message = (<MessageImage myMsg={myMsg} imageSrc={messageDetail.url}/>);
                break;
            case "video":
                message = (<MessageVideo url={messageDetail.url}/>);
                break;
            default:
                message = (<MessageOther myMsg={myMsg} messageDetail={messageDetail}/>);
        };

        return message;
    }

    return (
        <div
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

export default Message;