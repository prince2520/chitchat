import React from "react";
import date from "date-and-time";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

import MessageString from "./MessageString/MessageString";
import MessageOther from "./MessageOther/MessageOther";
import ImageContainer from "../../../../../components/ImageContainer/ImageContainer";

import MessageImage from "./MessageImage/MessageImage";
import MessageAudio from "./MessageAudio/MessageAudio";
import MessageVideo from "./MessageVideo/MessageVideo";
import { categoryState } from "../../../../../constants/constants";

import "./Message.css";

const Message = ({ myMsg, messageDetail }) => {
  const selectedType = useSelector(state => state.user.selectedType);

  const printHandler = (messageDetail) => {
    let message, createdTime, time;

    createdTime = new Date(messageDetail.createdAt);

    time = date.format(createdTime, "h:mm A");

    switch (messageDetail.type) {
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
      {((!myMsg) && !(selectedType === categoryState[1])) && (
        <div className={`message-img-container`}>
          <ImageContainer highResUrl={messageDetail.user.highResUrl} lowResUrl={messageDetail.user.lowResUrl} width="2.25rem" height="2.25rem" />
        </div>
      )}
      <div
        className={`message-box ${
          messageDetail.isOpenAIMsg && "open-ai-msg-box"
        }`}
      >
        {((!myMsg) && !(selectedType === categoryState[1]))  && <span className={"username"}>{messageDetail.user.name}</span>}
        {printHandler(messageDetail)}
      </div>
      {messageDetail.isOpenAIMsg && (
        <div className={"open-ai-icon"}>
          <Icon className="color-text" icon="ri:openai-fill" />
        </div>
      )}
    </div>
  );
};

export default React.memo(Message);
