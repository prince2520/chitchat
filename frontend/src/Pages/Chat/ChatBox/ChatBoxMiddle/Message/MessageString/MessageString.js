import React, { useEffect } from "react";

import useExtractLinkDetail from "../../../../../../hooks/useExtractLinkDetail";

import "./MessageString.css";


const MessageString = ({ message, time }) => {
  const [isUrl , linkData, setMessage] = useExtractLinkDetail();

  useEffect(()=>{
    setMessage(message);
  },[message]);

  return (
    <>
      <div className={`flex-center msg ${isUrl ? "msg-link" : ""}`}>
        {!isUrl ? (
          <p>{message}</p>
        ) : (
          <div className="flex-center msg-link__container">
            <div className="flex-center msg-link__container__img">
              <a className="flex-center" href={message} target="_blank">
                <img
                 src={linkData.icon || 'https://i.imgur.com/Up8N7lU.png'} 
                 alt={linkData.title}
                 onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src='https://i.imgur.com/Up8N7lU.png';
                }}
                 />
              </a>
            </div>

            <div className="flex-center msg-link__container__content">
              {linkData?.title && (
                <a
                  className="color-text-light msg-link__container__content__title"
                  target="_blank"
                  href={message}
                >
                  {linkData?.title?.slice(0, 50)}{" "}
                  {linkData?.title?.length > 50 && "..."}
                </a>
              )}
              {linkData.description && (
                <h6 className="color-text-extra-light">{linkData?.description}</h6>
              )}
              <h6 style={{ width: "100%" }}>
                <a
                  className="msg-link__container__content__link"
                  target="_blank"
                  href={message}
                >
                 {message?.slice(0, 100)}{" "}
                  {message.length > 100 && "..."}
                </a>
              </h6>
            </div>
          </div>
        )}
        <h6>{time}</h6>
      </div>
    </>
  );
};

export default React.memo(MessageString);
