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

import useCompressImg from "../../../hooks/useCompressImg";
import AuthContext from "../../../context/authContext";

import CreateGroupLarge from "../../../assests/images/CreateGroupLarge.png";
import CreateGroupSmall from "../../../assests/images/CreateGroupSmall.png";

const CreateGroup = () => {
  const imageRef = useRef();
  const authCtx = useContext(AuthContext);
  const [preview, setPreview] = useState(null);
  const [ highResUrl, lowResUrl, setData ] = useCompressImg();

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const createGroupHandler = async (name) => {
    if(!highResUrl || !lowResUrl) {
      return;
    }

    const highResUrlfirebaseUrl = await saveInFirebase(highResUrl);
    const lowResUrlfirebaseUrl = await saveInFirebase(lowResUrl);

    createGroup(authCtx?.token, name, highResUrlfirebaseUrl, lowResUrlfirebaseUrl)
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
    const name = event.target[1].value;
    await createGroupHandler(name);
  };

  return (
    <form
      className="flex-center create-group"
      onSubmit={(event) => submitHandler(event)}
    >
      <h3 className="color-text-light">Create a Group</h3>
      <div className={"image-edit-container"}>
        <ImageContainer highResUrl={preview || highResUrl || CreateGroupLarge } lowResUrl={lowResUrl || CreateGroupSmall } width="11rem" height="11rem"  />
        <input
          accept="image/*"
          ref={imageRef}
          type="file"
          style={{ display: "none" }}
          onChange={(event) => {
            setData(event);
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
