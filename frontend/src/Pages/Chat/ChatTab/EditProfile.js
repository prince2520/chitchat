import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useRef, useState } from "react";

import Button from "../../../components/Button/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";
import ImageContainer from "../../../components/ImageContainer/ImageContainer";

import { updateUser } from "../../../api/user";
import { UserActions } from "../../../store/userSlice";
import { saveInFirebase } from "../../../utils/SaveInFirebase";

import AuthContext from "../../../context/authContext";
import useCompressImg from "../../../hooks/useCompressImg";

import { AlertBoxActions } from "../../../store/alertSlice";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const [highResUrl, lowResUrl, setData] = useCompressImg(); 
  const [preview, setPreview] = useState(null);
  const imageRef = useRef();

  useEffect(() => {
    if (highResUrl && lowResUrl) {
      const readImg = new FileReader();
      readImg.onloadend = () => {
        setPreview(readImg.result);
      };
      readImg.readAsDataURL(highResUrl);
    } else {
      setPreview(null);
    }
  }, [highResUrl, lowResUrl]);

  const saveProfileBackend = (
    name,
    status,
    highResUrl = null,
    lowResUrl = null
  ) => {
    let data = {
      userId: authCtx.userId,
      name: name,
      status: status,
    };
    if (highResUrl && lowResUrl) {
      data['highResUrl'] = highResUrl;
      data['lowResUrl'] = lowResUrl
    }
    console.log('data: ', data);
    return updateUser(authCtx.token, data);
  };

  const saveProfileDetail = async (name, status) => {
    if(!highResUrl || !lowResUrl){
      return;
    }

    let highResUrlfirebaseUrl = await saveInFirebase(highResUrl);
    let lowResUrlfirebaseUrl = await saveInFirebase(lowResUrl);


    saveProfileBackend(name, status, highResUrlfirebaseUrl, lowResUrlfirebaseUrl)
      .then((result) => {
        console.log('result', result)
        dispatch(AlertBoxActions.showAlertBoxHandler(result));
        dispatch(
          UserActions.saveUserData({
            name: name,
            status: status,
            highResUrl: highResUrlfirebaseUrl,
            lowResUrl: lowResUrlfirebaseUrl
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
      className="flex-center edit-profile"
      onSubmit={(event) => submitHandler(event)}
    >
      <h3 className="color-text-light">My Profile</h3>
      <div className={"image-edit-container"}>
        <ImageContainer highResUrl={preview ? preview : user?.highResUrl} lowResUrl={user.lowResUrl} width="11rem" height="11rem" />
        <input
          accept="image/*"
          ref={imageRef}
          type="file"
          style={{ display: "none" }}
          onChange={(event) => {
            if(event){
              setData(event);

            }
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
        width="90%" maxWidth="20rem"
      />
      <CustomInput
        defaultValue={user?.status}
        type={"text"}
        label={"About Me"}
        icon={"material-symbols:edit"}
        width="90%" maxWidth="20rem"
      />
      <Button width={"50%"} backgroundColor={"var(--primary)"}>
        <p className="color-text">Save</p>
      </Button>
    </form>
  );
};
export default EditProfile;
