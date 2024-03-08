import Resizer from "react-image-file-resizer";

export const compressImage = (event, setImg) => {
  const file = event.target.files[0];
  
  if (file && file.type.substr(0, 5) === "image") {
    try {
      Resizer.imageFileResizer(
        event.target.files[0],
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          setImg(uri);
        },
        "blob",
        200,
        200
      );
    } catch (err) {
      console.log(err);
    }
  } else {
    setImg(null);
  }
};
