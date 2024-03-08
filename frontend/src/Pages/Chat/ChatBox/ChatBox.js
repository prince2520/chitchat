import React, { useState } from "react";

import { useSelector } from "react-redux";

import NoMessage from "./NoMessage/NoMessage";
import ChatBoxTop from "./ChatBoxTop/ChatBoxTop";
import ChatBoxBottom from "./ChatBoxBottom/ChatBoxBottom";
import ChatBoxMiddle from "./ChatBoxMiddle/ChatBoxMiddle";
import Loading from "../../../components/Loading/Loading";

import { categoryState } from "../../../constants/constants"

import "./ChatBox.css";

const ChatBox = () => {
  const user = useSelector((state) => state.user);
  const [showLoading, setShowLoading] = useState(false);

  let data = (user?.selectedType === categoryState[0]
    ? user.groups
    : user.privates
    ).filter(res => res._id === user.selectedId)[0];

  return (
    <div className="chat-box">
      <ChatBoxTop/>
      {showLoading ? (
        <div className={"full-screen flex-center loading-container"}>
          <Loading />
        </div>
      ) : (data.messages &&  data?.messages.length !== 0) ? (
        <ChatBoxMiddle/>
      ) : (
        <NoMessage />
      )}
      <ChatBoxBottom/>
    </div>
  );
};
export default React.memo(ChatBox);
