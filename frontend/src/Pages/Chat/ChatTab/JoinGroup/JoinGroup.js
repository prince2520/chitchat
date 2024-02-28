import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../../../components/Button/Button";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import ImageContainer from "../../../../components/ImageContainer/ImageContainer";

import { joinGroupHandler } from "../../../../api/api";
import { UserActions } from "../../../../store/user";

import AuthContext from "../../../../context/authContext";

const JoinGroup = () => {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    let groupId = event.target[0].value;

    joinGroupHandler(authCtx?.token, groupId, authCtx?.userId)
      .then((res) => {
        if (res.success) {
          dispatch(UserActions.addGroupHandler(res.groupData));
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
        <ImageContainer src={"https://i.imgur.com/W5U9qZB.png"} />
      </div>
      <CustomInput label={"Group Id"} icon={"material-symbols:edit"} />
      <Button backgroundColor={"var(--primary)"} width={"50%"}>
        <h5 className="color-text">Join</h5>
      </Button>
    </form>
  );
};
export default JoinGroup;
