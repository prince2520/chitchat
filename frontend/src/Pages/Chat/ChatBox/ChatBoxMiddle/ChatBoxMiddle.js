import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useRef } from "react";

import Message from "./Message/Message";
import DateLine from "./DateLine/DateLine";

import { getFormatDate } from "../../common_function";

import "./ChatBoxMiddle.css";
import AuthContext from "../../../../context/authContext";

const ChatBoxMiddle = ({ data }) => {
  const authCtx = useContext(AuthContext);

  const chatEndRef = useRef();

  console.log("data", data, "userID", authCtx.userId);

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
          {console.log("message user: ", res.user._id, "authCtx" , authCtx.userId)}

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
