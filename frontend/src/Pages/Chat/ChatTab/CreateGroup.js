import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext, useEffect, useRef, useState } from "react";

import Button from "../../../components/Button/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";
import ImageContainer from "../../../components/ImageContainer/ImageContainer";
import { createGroup } from "../../../api/group";
import { UserActions } from "../../../store/userSlice";

import AuthContext from "../../../context/authContext";

import CreateGroupLarge from "../../../assests/images/CreateGroupLarge.png";
import CreateGroupSmall from "../../../assests/images/CreateGroupSmall.png";

const CreateGroup = () => {
  const authCtx = useContext(AuthContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createGroupHandler = async (name) => {
    createGroup(
      authCtx?.token,
      name     
    )
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
    const name = event.target[0].value;
    await createGroupHandler(name);
  };

  return (
    <form
      className="flex-center create-group"
      onSubmit={(event) => submitHandler(event)}
    >
      <h3 className="color-text-light">Create a Group</h3>
      <ImageContainer
        highResUrl={ CreateGroupLarge}
        lowResUrl={ CreateGroupSmall}
        width="11rem"
        height="11rem"
        isEditable={false}
      />
      <CustomInput
        label={"Name"}
        icon={"material-symbols:edit"}
        width="90%"
        maxWidth="20rem"
      />
      <Button backgroundColor={"var(--primary)"} width="50%">
        <p className="color-text">Create</p>
      </Button>
    </form>
  );
};

export default CreateGroup;
