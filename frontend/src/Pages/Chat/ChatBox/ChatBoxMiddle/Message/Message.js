import './Message.css'
import ImageContainer from "../../../../../Helper/ImageContainer/ImageContainer";
import {Icon} from "@iconify/react";
import MessageImage from "./MessageImage/MessageImage";
import MessageString from "./MessageString/MessageString";
import MessageOther from "./MessageOther/MessageOther";

const Message = ({myMsg, messageDetail}) => {
    return (
        <div className={`message-container ${myMsg && 'my-message'}`}>
            {!myMsg && <div className={`message-img-container`}>
                <ImageContainer src={messageDetail.profileImageUrl}/>
            </div>}
            <div
                className={`message-box ${messageDetail.isOpenAIMsg && 'open-ai-msg-box'}`}>
                {!myMsg && <span className={'username'}>{messageDetail.username}</span>}
                {messageDetail.messageType === 'string' &&
                    <MessageString message={messageDetail.message}/>}
                {messageDetail.messageType === 'image' &&
                    <MessageImage myMsg={myMsg} imageSrc={messageDetail.url}/>}
                {(!(messageDetail.messageType === 'image') && !(messageDetail.messageType === 'string')) &&
                    <MessageOther myMsg={myMsg} messageDetail={messageDetail}/>}
            </div>
            {messageDetail.isOpenAIMsg &&
                <div className={'open-ai-icon'}>
                    <Icon icon="ri:openai-fill"/>
                </div>}
        </div>
    );
};

export default Message;