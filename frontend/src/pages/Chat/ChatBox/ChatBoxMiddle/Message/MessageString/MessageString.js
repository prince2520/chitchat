import React, { useEffect } from "react";

import useExtractLinkDetail from "../../../../../../hooks/useExtractLinkDetail";

import "./MessageString.css";

const MessageString = ({ message, time }) => {
  const [isUrl, linkData, setMessage] = useExtractLinkDetail();

  useEffect(() => {
    setMessage(message);
  }, [message, setMessage]);

  return (
    <>
      <div
        className={`flex-center message--string ${isUrl ? "message--link" : ""
          }`}
      >
        {!isUrl ? (
          <p className="message__content">{message}</p>
        ) : (
          <div className="flex-center message--link__container">
            <div className="flex-center message--link__container__img">
              <a className="flex-center" href={message} target="_blank" rel="noreferrer">
                <img
                  src={linkData.icon || "https://i.imgur.com/Up8N7lU.png"}
                  alt={linkData.title}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "https://i.imgur.com/Up8N7lU.png";
                  }}
                />
              </a>
            </div>

            <div className="flex-center  message--link__container__content">
              <p>
                {linkData?.title && (
                  <a
                    className="message--link__container__content__title"
                    target="_blank"
                    rel="noreferrer"
                    href={message}
                  >
                    {linkData?.title?.slice(0, 50)}{" "}
                    {linkData?.title?.length > 50 && "..."}
                  </a>
                )}
              </p>
              {linkData.description && <h6>{linkData?.description}</h6>}
              <h6 style={{ width: "100%" }}>
                <a
                  rel="noreferrer"
                  className="message--link__container__content__link"
                  target="_blank"
                  href={message}
                >
                  {message?.slice(0, 100)} {message.length > 100 && "..."}
                </a>
              </h6>
            </div>
          </div>
        )}
        <h6 className="message__time">{time}</h6>
      </div>
    </>
  );
};

export default React.memo(MessageString);
