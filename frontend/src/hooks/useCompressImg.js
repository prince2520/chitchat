import { useEffect, useState } from "react";

import Resizer from "react-image-file-resizer";

const useCompressImg = () => {
  const [data, setData] = useState(null);
  const [highResUrl, sethighResUrl] = useState(null);
  const [lowResUrl, setlowResUrl] = useState(null);

  const resizeFile = (file, width, height) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        width,
        height,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });


  const compressHelper = async (data, width, height) => {
    const file = data.target.files[0];
    let url = null;
    try {
        url = await resizeFile(file, width, height)
    } catch (err) {
      console.log(err);
    }
    return url;
  };

  const saveHighLowImg = async (data) => {
    const highRes = await compressHelper(data, 300, 300);
    const lowRes = await compressHelper(data, 20, 20);
    sethighResUrl(highRes);
    setlowResUrl(lowRes);
  };

  useEffect(() => {
    if (data && data.target) {
      const file = data.target.files[0];
      if (file && file.type.substr(0, 5) === "image") {
        saveHighLowImg(data);
      } else {
        sethighResUrl(null);
        setlowResUrl(null);
      }
    }
  }, [data]);

  return [highResUrl, lowResUrl, setData];
};

export default useCompressImg;
