import {categoryState} from "../../common";
import {sendGroupMessageHandler, sendPrivateMessageHandler} from "../../api";
import {sendChatMessageHandler} from "../../socket";
import {openAIAnswer} from "../../openai";

const privateMessageHandler = (message, authCtx, chat, isOpenAIMsg, sendMessageHandler, user=null) => {
    sendPrivateMessageHandler(authCtx?.token, authCtx?.userId, chat._id, message, isOpenAIMsg)
        .then(()=>{
            let users = [authCtx?.userId, chat._id];
            sendMessageHandler(message, users, authCtx?.userId, sendChatMessageHandler, isOpenAIMsg);
        }).catch(err=>console.log(err));
}

const groupMessageHandler = (message, authCtx, chat, isOpenAIMsg, sendMessageHandler, user) => {
    sendGroupMessageHandler(authCtx?.token, message, chat.name, user.username, isOpenAIMsg)
        .then(()=>{
            let users = chat.users;
            sendMessageHandler(message, users, chat._id ,sendChatMessageHandler, isOpenAIMsg);
        })
        .catch(err=>console.log(err));
}

const sendOpenAIAnswer = (message, cb, authCtx, chat, isOpenAIMsg, sendMessageHandler, user) => {
    if(isOpenAIMsg){
        openAIAnswer(message).then(answer=>{
            cb(answer, authCtx, chat, isOpenAIMsg, sendMessageHandler, user);
        }).catch(err=>console.log(err))
    };
}


export const messageHandler = (message, authCtx, chat, isOpenAIMsg, sendMessageHandler, user) => {
    if (chat.type === categoryState[0]) {
        groupMessageHandler(message, authCtx, chat, isOpenAIMsg, sendMessageHandler, user);
        sendOpenAIAnswer(message, groupMessageHandler, authCtx, chat, isOpenAIMsg, sendMessageHandler, user)
    }else {
        privateMessageHandler(message, authCtx, chat, isOpenAIMsg, sendMessageHandler, user);
        sendOpenAIAnswer(message, privateMessageHandler, authCtx, chat, isOpenAIMsg, sendMessageHandler, user)
    }
}