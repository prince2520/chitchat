import React from "react";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useRef } from "react";

import Message from "./Message/Message";
import DateLine from "./DateLine/DateLine";

import { getFormatDate } from "../../common_function";

import "./ChatBoxMiddle.css";

const ChatBoxMiddle = () => {
  const messages = useSelector((state) => state.chat.messages);
  const username = useSelector((state) => state.user.username);

  const chatEndRef = useRef();

  const checkShowDateCondition = (res, idx) => {
    if (idx === 0) return true;

    let prevDate, currDate;

    prevDate = getFormatDate(messages[idx - 1].createdAt);
    currDate = getFormatDate(res.createdAt);

    return prevDate !== currDate;
  };

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-box-middle border">
      {messages.map((res, idx) => (
        <React.Fragment key={idx}>
          {checkShowDateCondition(res, idx) && (
            <DateLine createdAt={res.createdAt} />
          )}
          <Message
            key={idx}
            messageDetail={res}
            myMsg={res.username === username}
          />
        </React.Fragment>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatBoxMiddle;
