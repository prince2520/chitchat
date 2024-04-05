import React from "react";

import "./MessageAudio.css"

const MessageAudio = ({ url, time }) => {
  return (
    <div className={"flex-center message--audio border"}>
      <audio src={url} controls />
      <h6 className="color-text-light">{time}</h6>
    </div>
  );
};

export default React.memo(MessageAudio);
