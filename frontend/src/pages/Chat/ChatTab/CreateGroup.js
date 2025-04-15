import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createGroup } from "../../../api/group";
import { UserActions } from "../../../reduxs/slice/userSlice";

import Button from "../../../components/Button/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CreateGroupLarge from "../../../assests/images/CreateGroupLarge.png";
import CreateGroupSmall from "../../../assests/images/CreateGroupSmall.png";
import ImageContainer from "../../../components/ImageContainer/ImageContainer";

const CreateGroup = () => {
  const [loading, setLoading] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state=>state.user);


  const createGroupHandler = async (data) => {
    setLoading(true);
    createGroup(user.token, data)
      .then((data) => {
        setLoading(false);
        if (data.success) {
          toast.success(data.message);
          dispatch(UserActions.addGroup(data.data));
          navigate("/chat");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(data.message);
      });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const status = event.target[1].value;
    await createGroupHandler({
      name,
      status,
    });
  };

  return (
    <form
      className="flex-center create-group"
      onSubmit={(event) => submitHandler(event)}
    >
      <h2 className="color-text-light">Create a Group</h2>
      <ImageContainer
        isEditable={false}
        highResUrl={CreateGroupLarge}
        lowResUrl={CreateGroupSmall}
        width="11rem"
        height="11rem"
        circle={false}
      />
      <CustomInput
        label={"Name"}
        icon={"material-symbols:edit"}
        width="90%"
        maxWidth="20rem"
      />
      <CustomInput
        label={"Description"}
        icon={"material-symbols:edit"}
        width="90%"
        maxWidth="20rem"
      />
      <Button loading={loading} backgroundColor={"var(--primary)"} width="50%">
        <h5 className="color-text">Create</h5>
      </Button>
    </form>
  );
};

export default CreateGroup;
