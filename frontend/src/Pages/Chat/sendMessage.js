import { openAIAnswer } from "../../openai";
import { categoryState } from "../../common";
import { socketSendMessage } from "../../socket";
import {
  sendGroupMessageHandler,
  sendPrivateMessageHandler,
} from "../../api/api";

const privateMessageHandler = (
  message,
  authCtx,
  chat,
  isOpenAIMsg,
  sendMessageHandler,
  user = null,
  messageType,
  size,
  url
) => {
  sendPrivateMessageHandler(
    authCtx?.token,
    authCtx?.userId,
    chat._id,
    message,
    isOpenAIMsg,
    messageType,
    size,
    url
  )
    .then(() => {
      let users = [authCtx?.userId, chat._id];
      sendMessageHandler(
        message,
        users,
        authCtx.userId,
        socketSendMessage,
        isOpenAIMsg,
        messageType,
        size,
        url
      );
    })
    .catch((err) => console.log(err));
};

const groupMessageHandler = (msgData) => {
  sendGroupMessageHandler(msgData)
    .then((res) => {
      let temp = {...msgData};
      temp.data =  res.data; 
      msgData.saveMessage(temp);
      socketSendMessage(temp);
    })
    .catch((err) => console.log(err));
};

const sendOpenAIAnswer = (
  message,
  cb,
  authCtx,
  chat,
  isOpenAIMsg,
  sendMessageHandler,
  user,
  messageType,
  size,
  url
) => {
  if (isOpenAIMsg) {
    openAIAnswer(message)
      .then((answer) => {
        cb(
          answer,
          authCtx,
          chat,
          isOpenAIMsg,
          sendMessageHandler,
          user,
          messageType,
          size,
          url
        );
      })
      .catch((err) => console.log(err));
  }
};

export const messageHandler = (msgData) => {
  (msgData.selectedType === categoryState[0]
    ? groupMessageHandler
    : privateMessageHandler)(msgData);

  // sendOpenAIAnswer(
  //   message,
  //   groupMessageHandler,
  //   authCtx,
  //   chat,
  //   isOpenAIMsg,
  //   sendMessageHandler,
  //   user,
  //   messageType,
  //   size,
  //   url
  // );
};
