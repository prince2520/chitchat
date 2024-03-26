import React from "react";
import { useSelector } from "react-redux";

import { categoryState } from "../../../constants/constants";

import NoMessage from "./NoMessage/NoMessage";
import ChatBoxTop from "./ChatBoxTop/ChatBoxTop";
import ChatBoxBottom from "./ChatBoxBottom/ChatBoxBottom";
import ChatBoxMiddle from "./ChatBoxMiddle/ChatBoxMiddle";

import "./ChatBox.css";

const ChatBox = () => {
  const user = useSelector((state) => state.user);

  let data = (
    user?.selectedType === categoryState[0] ? user.groups : user.privates
  ).filter((res) => res._id === user.selectedId)[0];

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
