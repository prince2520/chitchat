import React, { useContext, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import NoMessage from "./NoMessage/NoMessage";
import ChatBoxTop from "./ChatBoxTop/ChatBoxTop";
import ChatBoxBottom from "./ChatBoxBottom/ChatBoxBottom";
import ChatBoxMiddle from "./ChatBoxMiddle/ChatBoxMiddle";
import Loading from "../../../components/Loading/Loading";

import { categoryState } from "../../../common";
import { ChatActions } from "../../../store/chat";
import { fetchGroupMessages, fetchPrivateMessage } from "../../../api/api";

import AuthContext from "../../../context/authContext";

import "./ChatBox.css";

const ChatBox = () => {
  const chat = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLoading(true);

    (chat?.type === categoryState[0]
      ? fetchGroupMessages(chat.name, authCtx?.token)
      : fetchPrivateMessage(authCtx?.userId, chat._id, authCtx?.token)
    )
      .then((res) => {
        if (res.success) {
          dispatch(ChatActions.saveFetchChatMessage(res.messages));
          setShowLoading(false);
        }
      })
      .catch((err) => {
        setShowLoading(false);
      });
  }, [chat._id]);

  return (
    <div className="chat-box">
      <ChatBoxTop />
      {showLoading ? (
        <div className={"full-screen flex-center loading-container"}>
          <Loading />
        </div>
      ) : chat?.messages.length !== 0 ? (
        <ChatBoxMiddle />
      ) : (
        <NoMessage />
      )}
      <ChatBoxBottom />
    </div>
  );
};
export default React.memo(ChatBox);
