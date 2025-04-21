import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "../../../components/Button/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";
import JoinGroupLargeImg from "../../../assests/images/JoinGroup.png";
import JoinGroupSmallImg from "../../../assests/images/JoinGroupSmall.png";
import ImageContainer from "../../../components/ImageContainer/ImageContainer";

import { joinGroupThunk } from "../../../redux/thunk/chatThunk";


const JoinGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    let groupId = event.target[0].value;

    setLoading(true);

    dispatch(joinGroupThunk({ groupId }))
      .unwrap()
      .then(() => {
        navigate("/chat");
      }).catch(err => { console.log(err) })
      .finally(() => setLoading(false));
  };

  return (
    <form
      onSubmit={(event) => submitHandler(event)}
      className="flex-center join-group"
    >
      <h2 className="color-text-light">Join a Group</h2>
      <ImageContainer height="auto" src={JoinGroupLargeImg} highResUrl={JoinGroupLargeImg} lowResUrl={JoinGroupSmallImg} width="15rem" circle={false} />
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
