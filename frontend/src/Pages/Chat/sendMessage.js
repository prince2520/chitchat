import {categoryState} from "../../common";
import {sendGroupMessageHandler, sendPrivateMessageHandler} from "../../api";
import {sendChatMessageHandler} from "../../socket";
import {openAIAnswer} from "../../openai";

const privateMessageHandler = (message, authCtx, chat, isOpenAIMsg, sendMessageHandler, user=null, messageType) => {
    sendPrivateMessageHandler(authCtx?.token, authCtx?.userId, chat._id, message, isOpenAIMsg, messageType)
        .then(()=>{
            let users = [authCtx?.userId, chat._id];
            sendMessageHandler(message, users, authCtx?.userId, sendChatMessageHandler, isOpenAIMsg, messageType);
        }).catch(err=>console.log(err));
}

const groupMessageHandler = (message, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, messageType) => {
    sendGroupMessageHandler(authCtx?.token, message, chat.name, user.username, isOpenAIMsg, messageType)
        .then(()=>{
            let users = chat.users;
            sendMessageHandler(message, users, chat._id ,sendChatMessageHandler, isOpenAIMsg, messageType);
        })
        .catch(err=>console.log(err));
}

const sendOpenAIAnswer = (message, cb, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, messageType) => {
    if(isOpenAIMsg){
        openAIAnswer(message).then(answer=>{
            cb(answer, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, messageType);
        }).catch(err=>console.log(err))
    };
}


export const messageHandler = (message, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, messageType) => {
    if (chat.type === categoryState[0]) {
        groupMessageHandler(message, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, messageType);
        sendOpenAIAnswer(message, groupMessageHandler, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, messageType)
    }else {
        privateMessageHandler(message, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, messageType);
        sendOpenAIAnswer(message, privateMessageHandler, authCtx, chat, isOpenAIMsg, sendMessageHandler, user, messageType)
    }
}