import React, { useContext, useEffect, useState } from "react";
import { urlWebsiteData } from "../../../../../../api/helper";
import AuthContext from "../../../../../../context/authContext";

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
          console.log(res.data);
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
      <div className={"flex-center msg"} style={{ columnGap: "0.5rem" }}>
        {!isUrl ? (
          <p>{message}</p>
        ) : (
          <>
           {<img src={data.icon} alt={data.title} />}
            <a target="_blank" href={message}>
              {data.title}
            </a>
          </>
        )}
        <h6>{time}</h6>
      </div>
    </>
  );
};

export default React.memo(MessageString);
