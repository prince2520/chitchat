import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useRef, useState } from "react";

import Button from "../../../../components/Button/Button";
import ImageContainer from "../../../../components/ImageContainer/ImageContainer";
import CustomInput from "../../../../components/CustomInput/CustomInput";

import { createGroup } from "../../../../api/api";
import { UserActions } from "../../../../store/user";
import {
  compressImageHandler,
  saveImageIntoFirebase,
} from "../../common_function";

import AuthContext from "../../../../context/authContext";

import "./CreateGroup.css";

const CreateGroup = () => {
  const imageRef = useRef();
  const authCtx = useContext(AuthContext);
  const [preview, setPreview] = useState(null);
  const [groupImage, setGroupImage] = useState(null);
  const authData = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (groupImage) {
      const readImg = new FileReader();
      readImg.onloadend = () => {
        setPreview(readImg.result);
      };
      readImg.readAsDataURL(groupImage);
    } else {
      setPreview(null);
    }
  }, [groupImage]);

  const createGroupHandler = async (name, groupImg) => {
    let firebaseUrl = await saveImageIntoFirebase(groupImg);

    createGroup(authCtx?.token, name, authCtx?.userId, firebaseUrl)
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          dispatch(UserActions.addGroup(data.data));
          navigate("/chat");
        }
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    let groupName = event.target[1].value;

    await createGroupHandler(groupName, groupImage);
  };

  return (
    <form
      className="flex-center create-group-container"
      onSubmit={(event) => submitHandler(event)}
    >
      <h2>Create a Group</h2>
      <div className={"image-edit-container"}>
        <ImageContainer src={preview} />
        <input
          accept="image/*"
          ref={imageRef}
          type="file"
          style={{ display: "none" }}
          onChange={(event) => {
            compressImageHandler(event, setGroupImage);
          }}
        />
        <div
          className={"edit-btn box-shadow"}
          onClick={() => imageRef.current?.click()}
        >
          <Icon
            icon="material-symbols:edit"
            fontSize={"1.5rem"}
            color={`var(--primary)`}
          />
        </div>
      </div>
      <CustomInput label={"Name"} icon={"material-symbols:edit"} />
      <Button backgroundColor={"var(--primary)"} width="50%">
        <h5 className="color-text">Create</h5>
      </Button>
    </form>
  );
};

export default CreateGroup;
