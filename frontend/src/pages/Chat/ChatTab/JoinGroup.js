import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/Button/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";
import JoinGroupLargeImg from "../../../assests/images/JoinGroup.png";
import JoinGroupSmallImg from "../../../assests/images/JoinGroupSmall.png";


import { UserActions } from "../../../store/userSlice";
import { joinGroup } from "../../../api/group";

import AuthContext from "../../../context/authContext";
import ImageContainer from "../../../components/ImageContainer/ImageContainer";
import { socketAddMemberGroup } from "../../../socket";


const JoinGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const user = useSelector((state) => state.user);

  const submitHandler = (event) => {
    event.preventDefault();

    let groupId = event.target[0].value;

    joinGroup(authCtx?.token, groupId, authCtx?.userId)
      .then((res) => {
        if (res.success) {
          const data = {
            groupId : res.groupData._id,
            user : user
          };
          socketAddMemberGroup(data);
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
      <ImageContainer height="auto" src={JoinGroupLargeImg} highResUrl={JoinGroupLargeImg} lowResUrl={JoinGroupSmallImg}  width="15rem" circle={false}/>
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
