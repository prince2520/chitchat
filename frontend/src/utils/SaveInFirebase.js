import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const saveInFirebase = async (image) => {
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
