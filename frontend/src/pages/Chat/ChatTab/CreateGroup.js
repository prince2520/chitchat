import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CreateGroupLarge from "../../../assests/images/CreateGroupLarge.png";
import CreateGroupSmall from "../../../assests/images/CreateGroupSmall.png";
import ImageContainer from "../../../components/ImageContainer/ImageContainer";
import { createGroupThunk } from "../../../reduxs/thunk/chatThunk";

const CreateGroup = () => {
  const [loading, setLoading] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const submitHandler = async (event) => {
    event.preventDefault();
 
    let data = {
      name: event.target[0].value,
      status: event.target[1].value
    }

    setLoading(true);

    dispatch(createGroupThunk({ data }))
      .unwrap()
      .then(() => {
        navigate("/chat");
      })
      .finally(() => setLoading(false));
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
