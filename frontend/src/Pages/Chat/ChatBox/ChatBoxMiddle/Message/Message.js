import './Message.css'
import ImageContainer from "../../../../../Helper/ImageContainer/ImageContainer";
import OpenAI from "../../ChatBoxBottom/OpenAI/OpenAI";
import {Icon} from "@iconify/react";

const Message = ({myMsg, messageDetail}) => {
    return (
        <div className={`message-container ${myMsg && 'my-message'}`}>
            {!myMsg && <div className={`message-img-container`}>
                <ImageContainer src={messageDetail.profileImageUrl}/>
            </div>}
            <div className={`message-box ${messageDetail.isOpenAIMsg && 'open-ai-msg-box'}`}>
                {!myMsg && <span className={'username'}>{messageDetail.username}</span>}
                <span className={'msg'}>{messageDetail.message}</span>
            </div>
            {messageDetail.isOpenAIMsg &&
                <div className={'open-ai-icon'}>
                    <Icon icon="ri:openai-fill"/>
                </div>}
        </div>
    );
};

export default Message;