import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useRef } from "react";

import { categoryState } from "../../../../constants/constants";
import { getFormatDate } from ".././../../../utils/GetFormatDate";

import Message from "./Message/Message";
import DateLine from "./DateLine/DateLine";

import "./ChatBoxMiddle.css";

const ChatBoxMiddle = () => {
  const user = useSelector(state=>state.user);
  const chat = useSelector(state=>state.chat);

  const data = (chat?.selectedType === categoryState[0]
    ? chat.groups
    : chat.privates
    ).filter(res => res._id === chat.selectedId)[0];

  const chatEndRef = useRef();

  const checkShowDateCondition = (res, idx) => {
    if (idx === 0) return true;

    let prevDate, currDate;

    prevDate = getFormatDate(data.messages[idx - 1].createdAt);
    currDate = getFormatDate(res.createdAt);

    return prevDate !== currDate;
  };

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [data.messages]);

  return (
    <div className="border chat-box__middle">
      {data.messages.map((message, idx) => (
        <React.Fragment key={message._id}>
          {checkShowDateCondition(message, idx) && (
            <DateLine createdAt={message.createdAt} />
          )}
          <Message
            key={idx}
            messageDetail={message}
            myMsg={message.user._id === user._id}
          />
        </React.Fragment>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatBoxMiddle;
