import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../../components/Button/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";
import JoinGroupLargeImg from "../../../assests/images/JoinGroup.png";
import JoinGroupSmallImg from "../../../assests/images/JoinGroupSmall.png";

import { joinGroup } from "../../../api/group";
import { UserActions } from "../../../store/userSlice";
import { socketAddMemberGroup } from "../../../socket";

import AuthContext from "../../../context/authContext";
import ImageContainer from "../../../components/ImageContainer/ImageContainer";


const JoinGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    let groupId = event.target[0].value;

    setLoading(true);

    joinGroup(authCtx?.token, groupId, authCtx?.userId)
      .then((res) => {
        setLoading(false);
        if (res.success) {
          const data = {
            groupId : res.groupData._id,
            user : user
          };
          socketAddMemberGroup(data);
          dispatch(UserActions.addGroup(res.groupData));
          navigate("/chat");
          toast.success(res.message);
        }else{
          toast.error(res.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err);
      });
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
      <Button loading={loading} backgroundColor={"var(--primary)"} width={"50%"}>
        <h5 className="color-text">Join</h5>
      </Button>
    </form>
  );
};
export default JoinGroup;
