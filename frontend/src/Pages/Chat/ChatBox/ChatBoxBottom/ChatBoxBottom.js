import './ChatBoxBottom.css';
import {Icon} from "@iconify/react";
import {useContext, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {categoryState} from "../../../../common";
import {ChatActions} from "../../../../store/chat";
import {sendGroupMessageHandler, sendPrivateMessageHandler} from "../../../../api";
import AuthContext from "../../../../Context/auth";
import {sendChatMessageHandler} from "../../../../socket";
import CustomEmoji from "./CustomEmoji/CustomEmoji";
import SpeechToText from "./SpeechToText/SpeechToText";
import OpenAI from "./OpenAI/OpenAI";

const ChatBoxBottom = () => {
    const inputRef = useRef(null);

    const chat = useSelector(state => state.chat);
    const user = useSelector(state => state.user);

    const authCtx = useContext(AuthContext);

    const dispatch = useDispatch();
    const [showEmojis, setShowEmojis] = useState(false);
    const [isOpenAIMsg, setIsOpenAIMsg] = useState(false);

    const sendMessageHandler = (message, users, chatId , cb, isOpenAIMsg = false) => {
        let data, messageData;

        data = {
            sender_id : authCtx?.userId,
            users: users,

            messageData: {
                chatId: chatId,
                username: user.username,
                message: message,
                profileImageUrl: user.profileImageUrl,
                isOpenAIMsg: isOpenAIMsg
            }
        }

        dispatch(ChatActions.saveChatMessage({
            chatId: chat._id,
            username: user.username,
            message: message,
            profileImageUrl: user.profileImageUrl,
            isOpenAIMsg: isOpenAIMsg
        }));

        cb(data);
    }

    const sendMessage = (event) => {
        event.preventDefault();
        let message = inputRef.current.value;

        if (chat.type === categoryState[0]) {
            sendGroupMessageHandler(authCtx?.token, message, chat.name, user.username)
                .then(()=>{
                    let users = chat.users;

                    sendMessageHandler(message, users, chat._id ,sendChatMessageHandler);
                })
                .catch(err=>console.log(err));
        }else {
            sendPrivateMessageHandler(authCtx?.token, authCtx?.userId, chat._id, message, isOpenAIMsg)
                .then(()=>{
                    let users = [authCtx?.userId, chat._id];
                    sendMessageHandler(message, users, authCtx?.userId, sendChatMessageHandler, isOpenAIMsg);
                }).catch(err=>console.log(err));
        }

        inputRef.current.value = '';
    };

    const addSpeechText = (transcript) => console.log(transcript);

    const isOpenAIHandler = (openAICond) => {
        setIsOpenAIMsg(openAICond);
    }


    return (
        <form onSubmit={(event) => sendMessage(event)}
              className='chat-box-bottom border'>
            <OpenAI isOpenAIHandler={isOpenAIHandler}/>
            <input ref={inputRef} type="text" placeholder={'Type Something ...'}/>
            <div className='icon-container'>
                <Icon
                    onClick={()=>{setShowEmojis(!showEmojis)}}
                    icon="uil:smile"/>
                <button>
                    <Icon
                        icon="mingcute:send-line"/>
                </button>
            </div>
            {showEmojis && <CustomEmoji/>}
        </form>
    );
};

export default ChatBoxBottom;