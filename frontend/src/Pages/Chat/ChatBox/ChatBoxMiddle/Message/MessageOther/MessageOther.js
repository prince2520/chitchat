import React from "react";

import { Icon } from "@iconify/react";

import "./MessageOther.css";

const MessageOther = ({ messageDetail }) => {
  return (
    <div
      className={"message-other rounded-corner"}
      style={{ backgroundColor: "var(--background)" }}
    >
      <Icon icon="solar:folder-with-files-bold"  fontSize={"2.5rem"} />
      <div className="message-other-content">
        <h5>{messageDetail.message}</h5>
        <p>Type: {messageDetail.messageType.toUpperCase()}</p>
      </div>
      <h6>{messageDetail.size.toFixed(3)} MB</h6>
      <a  target="_blank" href={messageDetail.url}>
        <Icon fontSize={"1.75rem"} icon="ic:round-download" />
      </a>
    </div>
  );
};

export default React.memo(MessageOther);
