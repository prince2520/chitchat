import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/Button/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";
import JoinGroupImg from "../../../assests/images/JoinGroup.svg";

import { UserActions } from "../../../store/userSlice";
import { joinGroup } from "../../../api/group";

import AuthContext from "../../../context/authContext";


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
      className="flex-center join-group"
    >
      <h3 className="color-text-light">Join a Group</h3>
      <img src={JoinGroupImg} />
      <CustomInput
        width="90%" maxWidth="20rem"
        label={"Group Id"}
        icon={"material-symbols:edit"} />
      <Button backgroundColor={"var(--primary)"} width={"50%"}>
        <p className="color-text">Join</p>
      </Button>
    </form>
  );
};
export default JoinGroup;
