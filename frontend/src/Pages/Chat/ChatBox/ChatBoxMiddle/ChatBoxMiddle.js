import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useRef } from "react";

import Message from "./Message/Message";
import DateLine from "./DateLine/DateLine";

import { categoryState } from "../../../../common";

import { getFormatDate } from "../../common_function";

import "./ChatBoxMiddle.css";
import AuthContext from "../../../../context/authContext";

const ChatBoxMiddle = () => {
  const authCtx = useContext(AuthContext);
  const user = useSelector(state=>state.user);
  const data = (user?.selectedType === categoryState[0]
    ? user.groups
    : user.privates
    ).filter(res => res._id === user.selectedId)[0];

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
    <div className="chat-box-middle border">
      {data.messages.map((res, idx) => (
        <React.Fragment key={idx}>
          {checkShowDateCondition(res, idx) && (
            <DateLine createdAt={res.createdAt} />
          )}
          <Message
            key={idx}
            messageDetail={res}
            myMsg={res.user._id === authCtx.userId}
          />
        </React.Fragment>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatBoxMiddle;
