import React from "react";
import { useSelector } from "react-redux";

import { categoryState } from "../../../constants/constants";

import NoMessage from "./NoMessage/NoMessage";
import ChatBoxTop from "./ChatBoxTop/ChatBoxTop";
import ChatBoxBottom from "./ChatBoxBottom/ChatBoxBottom";
import ChatBoxMiddle from "./ChatBoxMiddle/ChatBoxMiddle";

import "./ChatBox.css";

const ChatBox = () => {
  const chat = useSelector((state) => state.chat);

  let data = (
    chat.selectedType === categoryState[0] ? chat.groups : chat.privates
  ).filter((res) => res._id === chat.selectedId)[0];

  return (
    <div className="chat-box">
      <ChatBoxTop />
      {data.messages && data?.messages.length !== 0 ? (
        <ChatBoxMiddle />
      ) : (
        <NoMessage />
      )}
      <ChatBoxBottom />
    </div>
  );
};
export default React.memo(ChatBox);
