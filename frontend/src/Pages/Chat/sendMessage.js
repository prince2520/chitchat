import {categoryState} from "../../common";
import {sendGroupMessageHandler, sendPrivateMessageHandler} from "../../api";
import {sendChatMessageHandler} from "../../socket";
import {openAIAnswer} from "../../openai";

const privateMessageHandler = (message, authCtx, chat, isOpenAIMsg, sendMessageHandler, user=null, messageType, size, url) => {
    sendPrivateMessageHandler(authCtx?.token, authCtx?.userId, chat._id, message, isOpenAIMsg, messageType, size, url)
        .then(()=>{
            let users = [authCtx?.userId, chat._id];
            sendMessageHandler(message, users, authCtx?.userId, sendChatMessageHandler, isOpenAIMsg, messageType, size, url);
        }).catch(err=>console.log(err));
}

const groupMessageHandler = (message, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, messageType, size, url) => {
    sendGroupMessageHandler(authCtx?.token, message, chat.name, user.username, isOpenAIMsg, messageType, size, url)
        .then(()=>{
            let users = chat.users;
            sendMessageHandler(message, users, chat._id ,sendChatMessageHandler, isOpenAIMsg, messageType, size,  url);
        })
        .catch(err=>console.log(err));
}

const sendOpenAIAnswer = (message, cb, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, messageType, size, url) => {
    if(isOpenAIMsg){
        openAIAnswer(message).then(answer=>{
            cb(answer, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, messageType, size, url);
        }).catch(err=>console.log(err))
    };
}


export const messageHandler = (message, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, messageType, size, url) => {
    if (chat.type === categoryState[0]) {
        groupMessageHandler(message, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, messageType, size, url);
        sendOpenAIAnswer(message, groupMessageHandler, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, messageType, size, url);
    }else {
        privateMessageHandler(message, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, messageType, size, url);
        sendOpenAIAnswer(message, privateMessageHandler, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, messageType, size, url)
    }
}