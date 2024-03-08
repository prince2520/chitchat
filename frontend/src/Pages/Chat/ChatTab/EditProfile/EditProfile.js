import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useRef, useState } from "react";

import Button from "../../../../components/Button/Button";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import ImageContainer from "../../../../components/ImageContainer/ImageContainer";

import { updateUser } from "../../../../api/user";
import { UserActions } from "../../../../store/userSlice";


import { compressImage } from "../../../../utils/CompressImage";
import { saveInFirebase } from "../../../../utils/SaveInFirebase";

import AuthContext from "../../../../context/authContext";

import { AlertBoxActions } from "../../../../store/alertSlice";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const imageRef = useRef();

  useEffect(() => {
    if (profileImage) {
      const readImg = new FileReader();
      readImg.onloadend = () => {
        setPreview(readImg.result);
      };
      readImg.readAsDataURL(profileImage);
    } else {
      setPreview(null);
    }
  }, [profileImage]);

  const saveProfileBackend = (
    name,
    status,
    profileImageUrl = null
  ) => {
    let data = {
      userId: authCtx.userId,
      name: name,
      status: status,
    };
    if (profileImageUrl) {
      data.profileImageUrl = profileImageUrl;
    }
    return updateUser(authCtx.token, data);
  };

  const saveProfileDetail = async (name, status) => {
    let firebaseUrl = await saveInFirebase(profileImage);

    saveProfileBackend(name, status, firebaseUrl)
      .then((result) => {
        dispatch(AlertBoxActions.showAlertBoxHandler(result));
        dispatch(
          UserActions.saveUserData({
            name: name,
            status: status,
            profileImageUrl: firebaseUrl
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let name, status;

    name = event.target[1].value;
    status = event.target[2].value;

    saveProfileDetail(name, status);
  };

  return (
    <form
      className="flex-center create-group"
      onSubmit={(event) => submitHandler(event)}
    >
      <h2>My Profile</h2>
      <div className={"image-edit-container"}>
        <ImageContainer src={preview ? preview : user?.profileImageUrl} width="12rem" height="12rem" />
        <input
          accept="image/*"
          ref={imageRef}
          type="file"
          style={{ display: "none" }}
          onChange={(event) => {
            compressImage(event, setProfileImage);
          }}
        />
        <div
          className={"edit-btn box-shadow"}
          onClick={() => {
            imageRef.current.click();
          }}
        >
          <Icon
            icon="material-symbols:edit"
            fontSize={"1.5rem"}
            color={`var(--primary)`}
          />
        </div>
      </div>
      <CustomInput
        defaultValue={user?.name}
        type={"text"}
        label={"Name"}
        icon={"material-symbols:edit"}
      />
      <CustomInput
        defaultValue={user?.status}
        type={"text"}
        label={"About Me"}
        icon={"material-symbols:edit"}
      />
      <Button width={"50%"} backgroundColor={"var(--primary)"}>
        <h5 className="color-text">Save</h5>
      </Button>
    </form>
  );
};
export default EditProfile;
