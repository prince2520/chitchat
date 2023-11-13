import {Icon} from "@iconify/react";
import {useContext, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import OpenAI from "./OpenAI/OpenAI";
import CustomEmoji from "./CustomEmoji/CustomEmoji";

import {messageHandler} from "../../sendMessage";
import {categoryState} from "../../../../common";
import {ChatActions} from "../../../../store/chat";
import {OverlayActions} from "../../../../store/overlay";

import AuthContext from "../../../../context/auth";

import './ChatBoxBottom.css';
import {HelperActions} from "../../../../store/helper";
import {useDetectClickOutside} from "react-detect-click-outside";

const ChatBoxBottom = () => {
    const inputRef = useRef(null);

    const chat = useSelector(state => state.chat);
    const user = useSelector(state => state.user);

    const authCtx = useContext(AuthContext);

    const dispatch = useDispatch();

    const [showEmojis, setShowEmojis] = useState(false);
    const [isOpenAIMsg, setIsOpenAIMsg] = useState(false);

    const sendMessageHandler = (message, users, chatId , cb, isOpenAIMsg = false, messageType) => {
        let data, messageData;
        messageData = {
            chatId: chatId,
            username: user.username,
            message: message,
            profileImageUrl: user.profileImageUrl,
            isOpenAIMsg: isOpenAIMsg,
            messageType : messageType,
            createdAt: (new Date()).toISOString()
        }

        data = {
            sender_id : authCtx?.userId,
            users: users,
        }

        data['messageData'] = {...messageData};

        if(chat.type===categoryState[1]){
            messageData['chatId'] = chat._id;
        }

        dispatch(ChatActions.saveChatMessage(messageData));

        cb(data);
    }

    const sendMessage = (event) => {
        event.preventDefault();
        setShowEmojis(false);

        let message = inputRef.current.value;

        if(message === '')
            return

        messageHandler( message, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, 'string', 0, '');

        inputRef.current.value = '';
    };

    const isOpenAIHandler = (openAICond) => setIsOpenAIMsg(openAICond);

    const closeEmojiHandler = () => {
        setShowEmojis(false);
    }

    const ref = useDetectClickOutside({ onTriggered: closeEmojiHandler});


    return (
        <form ref={ref} onSubmit={(event) => sendMessage(event)}
              className='chat-box-bottom '>
            <div className={'chat-box-bottom-left'}>
                <Icon
                    className={'smile-icon cursor-btn'}
                    onClick={()=>{setShowEmojis(!showEmojis)}}
                    icon="emojione:winking-face"/>
                <Icon  className={'files-icon'} onClick={()=>dispatch(OverlayActions.openDragDropHandler())} icon="tabler:files" />
                <OpenAI isOpenAIHandler={isOpenAIHandler}/>
            </div>
            <div className={'chat-box-bottom-middle border'}>
                <input ref={inputRef} type="text" placeholder={'Type Something ...'}/>
            </div>
            <div className='chat-box-bottom-right  align-center icon-container'>
                <button className={'send-msg-button cursor-btn align-center'}>
                    <Icon
                        icon="mingcute:send-line"/>
                </button>
            </div>
            {showEmojis && <CustomEmoji setShowEmojis={setShowEmojis} inputRef={inputRef}/>}
        </form>
    );
};

export default ChatBoxBottom;