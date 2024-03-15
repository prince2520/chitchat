import { useState } from "react";
import AuthContext from "../context/authContext";
import { urlWebsiteData } from "../api/helper";

import { isValidUrl } from "../utils/IsValidUrl";

import { useEffect, useContext } from "react";

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
