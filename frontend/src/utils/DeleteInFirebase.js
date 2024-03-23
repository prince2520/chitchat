import { ref, deleteObject } from "firebase/storage";

import { storage } from "../firebase";

export const deleteInFirebase = async (url) => {
  console.log("deleteInFirebase" , url);
  const location = ref(storage, url);

  let res;
  try {
    res  = await deleteObject(location);
  }catch (err) {
    console.log(err);
  }

  return res;
};
