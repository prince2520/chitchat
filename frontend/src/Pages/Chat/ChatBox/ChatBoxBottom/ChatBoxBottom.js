import './ChatBoxBottom.css';
import {Icon} from "@iconify/react";
import {useContext, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ChatActions} from "../../../../store/chat";
import AuthContext from "../../../../Context/auth";
import CustomEmoji from "./CustomEmoji/CustomEmoji";
import OpenAI from "./OpenAI/OpenAI";
import {DragAndDropActions} from "../../../../store/dragAndDrop";
import {messageHandler} from "../../sendMessage";

const ChatBoxBottom = () => {
    const inputRef = useRef(null);

    const chat = useSelector(state => state.chat);
    const user = useSelector(state => state.user);

    const authCtx = useContext(AuthContext);

    const dispatch = useDispatch();

    const [showEmojis, setShowEmojis] = useState(false);
    const [isOpenAIMsg, setIsOpenAIMsg] = useState(false);

    const sendMessageHandler = (message, users, chatId , cb, isOpenAIMsg = false, messageType) => {
        let data;

        data = {
            sender_id : authCtx?.userId,
            users: users,

            messageData: {
                chatId: chatId,
                username: user.username,
                message: message,
                profileImageUrl: user.profileImageUrl,
                isOpenAIMsg: isOpenAIMsg,
                messageType : messageType,
            }
        }

        dispatch(ChatActions.saveChatMessage({
            chatId: chat._id,
            username: user.username,
            message: message,
            profileImageUrl: user.profileImageUrl,
            isOpenAIMsg: isOpenAIMsg,
            messageType: messageType,
        }));

        cb(data);
    }

    const sendMessage = (event) => {
        event.preventDefault()

        let message = inputRef.current.value;

        if(message === '')
            return

        messageHandler( message, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, 'string', 0, '');

        inputRef.current.value = '';
    };

    const isOpenAIHandler = (openAICond) => setIsOpenAIMsg(openAICond);

    return (
        <form onSubmit={(event) => sendMessage(event)}
              className='chat-box-bottom border'>
            <Icon  className={'files-icon'} onClick={()=>dispatch(DragAndDropActions.showDragAndDrop())} icon="tabler:files" />
            <OpenAI isOpenAIHandler={isOpenAIHandler}/>
            <input ref={inputRef} type="text" placeholder={'Type Something ...'}/>
            <div className='icon-container'>
                <Icon
                    onClick={()=>{setShowEmojis(!showEmojis)}}
                    icon="emojione:winking-face"/>
                <button>
                    <Icon
                        icon="mingcute:send-line"/>
                </button>
            </div>
            {showEmojis && <CustomEmoji setShowEmojis={setShowEmojis} inputRef={inputRef}/>}
        </form>
    );
};

export default ChatBoxBottom;