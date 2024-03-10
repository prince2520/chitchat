import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext, useEffect, useRef, useState } from "react";

import Button from "../../../components/Button/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";
import ImageContainer from "../../../components/ImageContainer/ImageContainer";

import { createGroup } from "../../../api/group";
import { UserActions } from "../../../store/userSlice";
import { saveInFirebase } from "../../../utils/SaveInFirebase";
import { compressImage } from "../../../utils/CompressImage";


import AuthContext from "../../../context/authContext";

const CreateGroup = () => {
  const imageRef = useRef();
  const authCtx = useContext(AuthContext);
  const [preview, setPreview] = useState(null);
  const [groupImage, setGroupImage] = useState(null);

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
    let firebaseUrl = await saveInFirebase(groupImg);

    createGroup(authCtx?.token, name, firebaseUrl)
      .then((data) => {
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
      className="flex-center create-group"
      onSubmit={(event) => submitHandler(event)}
    >
      <h3 className="color-text-light">Create a Group</h3>
      <div className={"image-edit-container"}>
        <ImageContainer src={preview}  width="9rem" height="9rem"  />
        <input
          accept="image/*"
          ref={imageRef}
          type="file"
          style={{ display: "none" }}
          onChange={(event) => {
            compressImage(event, setGroupImage);
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
      <CustomInput label={"Name"} icon={"material-symbols:edit"} width="90%" maxWidth="20rem" />
      <Button backgroundColor={"var(--primary)"} width="50%">
        <p className="color-text">Create</p>
      </Button>
    </form>
  );
};

export default CreateGroup;
