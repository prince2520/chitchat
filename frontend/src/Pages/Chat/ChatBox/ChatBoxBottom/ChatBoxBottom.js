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
import {openAIAnswer} from "../../../../openai";

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

    const privateMessageHandler = (message) => {
        sendPrivateMessageHandler(authCtx?.token, authCtx?.userId, chat._id, message, isOpenAIMsg)
            .then(()=>{
                let users = [authCtx?.userId, chat._id];
                sendMessageHandler(message, users, authCtx?.userId, sendChatMessageHandler, isOpenAIMsg);
            }).catch(err=>console.log(err));
    }

    const groupMessageHandler = (message) => {
        sendGroupMessageHandler(authCtx?.token, message, chat.name, user.username, isOpenAIMsg)
            .then(()=>{
                let users = chat.users;
                sendMessageHandler(message, users, chat._id ,sendChatMessageHandler, isOpenAIMsg);
            })
            .catch(err=>console.log(err));
    }

    const sendOpenAIAnswer = (message, cb) => {
        if(isOpenAIMsg){
            openAIAnswer(message).then(answer=>{
                cb(answer);
            }).catch(err=>console.log(err))
        };
    }

    const sendMessage = (event) => {
        event.preventDefault()

        let message = inputRef.current.value;

        if(message==='')
            return

        if (chat.type === categoryState[0]) {
            groupMessageHandler(message);
            sendOpenAIAnswer(message, groupMessageHandler)
        }else {
            privateMessageHandler(message);
            sendOpenAIAnswer(message, privateMessageHandler)
        }

        inputRef.current.value = '';
    };

    const isOpenAIHandler = (openAICond) => setIsOpenAIMsg(openAICond);


    return (
        <form onSubmit={(event) => sendMessage(event)}
              className='chat-box-bottom border'>
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