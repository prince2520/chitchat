import { useState } from "react";
import { useEffect, useContext } from "react";

import { urlWebsiteData } from "../api/helper";
import { isValidUrl } from "../utils/IsValidUrl";

import AuthContext from "../context/authContext";

const useExtractLinkDetail = () => {
  const [isUrl, setIsUrl] = useState(false);
  const [message, setMessage] = useState(null);
  const [linkData, setLinkData] = useState({
    title: undefined,
    icon: undefined,
    description: undefined,
  });

  const authCtx = useContext(AuthContext);


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
