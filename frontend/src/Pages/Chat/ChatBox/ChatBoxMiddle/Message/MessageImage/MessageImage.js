import React from "react";
import { Icon } from "@iconify/react";

import ModalImage from "react-modal-image";

import "./MessageImage.css";

const MessageImage = ({ myMsg, imageSrc, time }) => {
  return (
    <div
      className={"flex-center send-img chat-msg-background media-container"}
      style={{
        borderColor: myMsg && "var(--white)",
        alignSelf: !myMsg && "flex-start",
      }}
    >
      <ModalImage
        small={imageSrc}
        medium={imageSrc}
        hideDownload={true}
        showRotate={true}
      />
      <div className={"image-bottom"}>
        <Icon style={{color:"var(text-extra-light)"}} icon="typcn:image"/>
        <h6 className="color-text-light">{time}</h6>
      </div>
    </div>
  );
};

export default React.memo(MessageImage);
