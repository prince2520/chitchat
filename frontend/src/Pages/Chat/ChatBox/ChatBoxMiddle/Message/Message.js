import React from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

import { categoryState } from "../../../../../constants/constants";
import { printMessage } from "../../../../../utils/PrintMessage";

import ImageContainer from "../../../../../components/ImageContainer/ImageContainer";

import "./Message.css";

const Message = ({ myMsg, messageDetail }) => {
  const selectedType = useSelector((state) => state.user.selectedType);
  return (
    <div
      style={{
        justifyContent: !myMsg ? "flex-start" : "flex-end",
        alignSelf: myMsg ? "flex-end" : "flex-start",
      }}
      className={`flex-center message ${myMsg && "my-message"}`}
    >
      {!myMsg && !(selectedType === categoryState[1]) && (
        <div className={`message__img`}>
          <ImageContainer
            highResUrl={messageDetail.user.highResUrl}
            lowResUrl={messageDetail.user.lowResUrl}
            width="2.25rem"
            height="2.25rem"
          />
        </div>
      )}
      <div
        className={`message__container ${
          messageDetail.isOpenAIMsg && "open-ai__message__container"
        }`}
      >
        <h6
          style={{
            width: "100%",
            textAlign: "right",
            display:
              !myMsg && !(selectedType === categoryState[1]) ? "block" : "none",
          }}
        >
          {messageDetail.user.name}
        </h6>
        {printMessage(messageDetail, myMsg)}
      </div>
      {messageDetail.isOpenAIMsg && (
        <div className={"flex-center open-ai__message__container__icon"}>
          <Icon className="color-text" icon="ri:openai-fill" />
        </div>
      )}
    </div>
  );
};

export default React.memo(Message);
