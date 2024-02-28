import Resizer from "react-image-file-resizer";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import date from "date-and-time";

export const compressImageHandler = (event, setImg) => {
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

export const saveImageIntoFirebase = async (image) => {
  if (image) {
    let imageUrl = new Date() + "-" + image.name || null;

    let imageRef = ref(storage, `images/${imageUrl}`);
    const uploadTask = uploadBytesResumable(imageRef, image);

    return new Promise(function (resolve, reject) {
      try {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                console.log("Error");
            }
          },
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((firebase_url) => {
              resolve(firebase_url);
            });
          }
        );
      } catch (err) {
        reject(null);
      }
    });
  }
};

export const getFormatDate = (createdAt) => {
  let createdAtToDate, formatDate;
  createdAtToDate = new Date(createdAt);

  formatDate = date.format(createdAtToDate, "ddd, DD-MMM-YYYY");
  return formatDate;
};

export const getDragAndDropData = (file) => {
  let data, name, size, type, location, fileData;

  name = file.name;
  size = file.size / (1000 * 1000);
  type = file.type.split("/")[0];
  fileData = file;

  location = URL.createObjectURL(file);

  data = {
    name: name,
    size: size,
    type: type,
    location: location,
    fileData: fileData,
  };

  return data;
};
