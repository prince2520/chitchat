import './Message.css'
import ImageContainer from "../../../../../Helper/ImageContainer/ImageContainer";

const Message = ({myMsg, message, profileImgUrl, username}) => {
    return (
        <div className={`message-container ${myMsg && 'my-message'}`}>
            {!myMsg && <div className={`message-img-container`}>
                <ImageContainer src={profileImgUrl}/>
            </div>}
            <div className={'message-box'}>
                {!myMsg && <span className={'username'}>{username}</span>}
                <span className={'msg'}>{message}</span>
            </div>
        </div>
    );
};

export default Message;