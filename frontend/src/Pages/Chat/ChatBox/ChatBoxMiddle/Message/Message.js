import React from "react";
import { Icon } from "@iconify/react";
import { lazy } from "react";

import date from "date-and-time";

import MessageString from "./MessageString/MessageString";
import MessageOther from "./MessageOther/MessageOther";
import ImageContainer from "../../../../../components/ImageContainer/ImageContainer";

import "./Message.css";

const MessageImage = lazy(() => import("./MessageImage/MessageImage"));
const MessageAudio = lazy(() => import("./MessageAudio/MessageAudio"));
const MessageVideo = lazy(() => import("./MessageVideo/MessageVideo"));

const Message = ({ myMsg, messageDetail }) => {
  const printHandler = (messageDetail) => {
    let message, createdTime, time;

    createdTime = new Date(messageDetail.createdAt);

    time = date.format(createdTime, "h:mm A");

    switch (messageDetail.messageType) {
      case "string":
        message = <MessageString message={messageDetail.message} time={time} />;
        break;
      case "audio":
        message = <MessageAudio url={messageDetail.url} />;
        break;
      case "image":
        message = (
          <MessageImage
            time={time}
            myMsg={myMsg}
            imageSrc={messageDetail.url}
          />
        );
        break;
      case "video":
        message = <MessageVideo url={messageDetail.url} time={time} />;
        break;
      default:
        message = <MessageOther myMsg={myMsg} messageDetail={messageDetail} />;
    }
    return message;
  };

  return (
    <div className={`message-container ${myMsg && "my-message"}`}>
      {!myMsg && (
        <div className={`message-img-container`}>
          <ImageContainer src={messageDetail.profileImageUrl} />
        </div>
      )}
      <div
        className={`message-box ${
          messageDetail.isOpenAIMsg && "open-ai-msg-box"
        }`}
      >
        {!myMsg && <span className={"username"}>{messageDetail.username}</span>}
        {printHandler(messageDetail)}
      </div>
      {messageDetail.isOpenAIMsg && (
        <div className={"open-ai-icon"}>
          <Icon icon="ri:openai-fill" />
        </div>
      )}
    </div>
  );
};

export default React.memo(Message);
