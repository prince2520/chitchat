import { storage } from "../services/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { uid } from 'uid';

export const saveInFirebase = async (image, url = uid(32)) => {
  if (image) {

    let imageRef = ref(storage,url);
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
