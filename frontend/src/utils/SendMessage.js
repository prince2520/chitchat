// import { openAIAnswer } from "../openai";
import { categoryState } from "../constants/constants";
import { socketSendMessage } from "../socket";
import {
  saveGroupMessage
} from "../api/group";

import {
  savePrivateMessage
} from "../api/private";

// const sendOpenAIAnswer = (
//   message,
//   cb,
//   authCtx,
//   chat,
//   isOpenAIMsg,
//   sendMessageHandler,
//   user,
//   messageType,
//   size,
//   url
// ) => {
//   if (isOpenAIMsg) {
//     openAIAnswer(message)
//       .then((answer) => {
//         cb(
//           answer,
//           authCtx,
//           chat,
//           isOpenAIMsg,
//           sendMessageHandler,
//           user,
//           messageType,
//           size,
//           url
//         );
//       })
//       .catch((err) => console.log(err));
//   }
// };

export const messageHandler = (msgData) => {
  const isGroup = msgData.selectedType === categoryState[0];

  (isGroup
    ? saveGroupMessage(msgData)
    : savePrivateMessage(msgData)
  )
    .then((res) => {
      let temp = { ...msgData };
      temp.data = res.data;
      msgData.saveMessage(temp);
      socketSendMessage(temp);
    })
    .catch((err) => console.log(err));

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
