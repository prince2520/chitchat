import { useState } from "react";
import { useEffect } from "react";

import { urlWebsiteData } from "../api/helper";
import { isValidUrl } from "../utils/IsValidUrl";

import { useSelector } from "react-redux";

const useExtractLinkDetail = () => {
  const [isUrl, setIsUrl] = useState(false);
  const [message, setMessage] = useState(null);
  const [linkData, setLinkData] = useState({
    title: undefined,
    icon: undefined,
    description: undefined,
  });

  const token = useSelector(state=>state.user.token);

  const fetchUrlWebsiteData = async (url) => {
    const data = {
      token: token,
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
