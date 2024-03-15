import { useState } from "react";
import AuthContext from "../context/authContext";
import { urlWebsiteData } from "../api/helper";

import { useEffect, useContext } from "react";

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

const useExtractLinkDetail = () => {
  const [isUrl, setIsUrl] = useState(false);
  const authCtx = useContext(AuthContext);
  const [linkData, setLinkData] = useState({
    title: undefined,
    icon: undefined,
    description: undefined,
  });
  const [message, setMessage] = useState(null);

  const fetchUrlWebsiteData = async (url) => {
    const data = {
      token: authCtx.token,
      url: url,
    };

    urlWebsiteData(data)
      .then((res) => {
        if (res.success) {
          setLinkData(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (message) {
      const checkUrl = isValidUrl(message);
      if (checkUrl) {
        setIsUrl(checkUrl);
        fetchUrlWebsiteData(message);
      }
    }
  }, [message]);

  return [isUrl, linkData, setMessage];
};

export default useExtractLinkDetail;
