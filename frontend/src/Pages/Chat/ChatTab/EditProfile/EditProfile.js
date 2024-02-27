import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useRef, useState } from "react";

import Button from "../../../../components/Button/Button";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import ImageContainer from "../../../../components/ImageContainer/ImageContainer";

import { saveProfile } from "../../../../api/api";
import { UserActions } from "../../../../store/user";
import {
  compressImageHandler,
  saveImageIntoFirebase,
} from "../../common_function";

import AuthContext from "../../../../context/authContext";

import { AlertBoxActions } from "../../../../store/alert";

const EditProfile = () => {
  const authData = useSelector((state) => state.user);
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

  const saveProfileBackend = async (
    username,
    status,
    profileImageUrl = null
  ) => {
    let data = {
      userId: authCtx.userId,
      username: username,
      status: status,
    };
    if (profileImageUrl) {
      data.profileImageUrl = profileImageUrl;
    }
    return saveProfile(authCtx.token, data);
  };

  const saveProfileDetail = async (username, status) => {
    let firebaseUrl = await saveImageIntoFirebase(profileImage);

    saveProfileBackend(username, status, firebaseUrl)
      .then((result) => {
        dispatch(AlertBoxActions.showAlertBoxHandler(result));
        dispatch(
          UserActions.saveUserData({
            username: username,
            status: status,
            profileImageUrl: firebaseUrl,
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    let username, status;

    username = event.target[1].value;
    status = event.target[2].value;

    await saveProfileDetail(username, status);
  };

  return (
    <form
      className="flex-center create-group-container"
      onSubmit={(event) => submitHandler(event)}
    >
      <h2>My Profile</h2>
      <div className={"image-edit-container"}>
        <ImageContainer src={preview ? preview : authData?.profileImageUrl} />
        <input
          accept="image/*"
          ref={imageRef}
          type="file"
          style={{ display: "none" }}
          onChange={(event) => {
            compressImageHandler(event, setProfileImage);
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
        defaultValue={authData?.username}
        type={"text"}
        label={"Name"}
        icon={"material-symbols:edit"}
      />
      <CustomInput
        defaultValue={authData?.status}
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
