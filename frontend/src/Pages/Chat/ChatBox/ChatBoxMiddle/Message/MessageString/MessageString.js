import React, { useContext, useEffect, useState } from "react";
import { urlWebsiteData } from "../../../../../../api/helper";
import AuthContext from "../../../../../../context/authContext";

import "./MessageString.css";

const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

const MessageString = ({ message, time }) => {
  const authCtx = useContext(AuthContext);
  const [isUrl, setIsUrl] = useState(false);
  const [data, setData] = useState({
    title: undefined,
    icon: undefined,
  });

  const fetchUrlWebsiteData = async (url) => {
    const data = {
      token: authCtx.token,
      url: url,
    };

    urlWebsiteData(data)
      .then((res) => {
        if (res.success) {
          setData(res.data);
          console.log('icon: ', res.data.icon.substr(res.data.icon.length - 3, 3));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const checkUrl = isValidUrl(message);
    if (checkUrl) {
      setIsUrl(checkUrl);
      fetchUrlWebsiteData(message);
    }
  }, [message]);

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
                 src={data.icon} 
                 alt={data.title}
                 onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src='https://i.imgur.com/Up8N7lU.png';
                }}
                 />
              </a>
            </div>

            <div className="flex-center msg-link__container__content">
              {data?.title && (
                <a
                  className="color-text-light msg-link__container__content__title"
                  target="_blank"
                  href={message}
                >
                  {data?.title?.slice(0, 50)}{" "}
                  {data?.title?.length > 50 && "..."}
                </a>
              )}
              {data.description && (
                <h6 className="color-text-extra-light">{data?.description}</h6>
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
