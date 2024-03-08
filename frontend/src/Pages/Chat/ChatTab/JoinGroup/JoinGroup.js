import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../../../components/Button/Button";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import ImageContainer from "../../../../components/ImageContainer/ImageContainer";

import { UserActions } from "../../../../store/userSlice";
import { joinGroup } from "../../../../api/group";

import AuthContext from "../../../../context/authContext";

const JoinGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    let groupId = event.target[0].value;

    joinGroup(authCtx?.token, groupId, authCtx?.userId)
      .then((res) => {
        if (res.success) {
          dispatch(UserActions.addGroup(res.groupData));
          navigate("/chat");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      onSubmit={(event) => submitHandler(event)}
      className="flex-center create-group-container"
    >
      <h2>Join a Group</h2>
      <div className={"image-edit-container"}>
        <ImageContainer src={"https://i.imgur.com/W5U9qZB.png"}  width="12rem" height="12rem" />
      </div>
      <CustomInput label={"Group Id"} icon={"material-symbols:edit"} />
      <Button backgroundColor={"var(--primary)"} width={"50%"}>
        <h5 className="color-text">Join</h5>
      </Button>
    </form>
  );
};
export default JoinGroup;
