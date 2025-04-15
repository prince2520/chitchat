import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveInFirebase } from "../../../utils/SaveInFirebase";

import Button from "../../../components/Button/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";
import ImageContainer from "../../../components/ImageContainer/ImageContainer";
import { updateUserThunk } from "../../../reduxs/thunk/userThunk";

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [lowResUrl, setLowResUrl] = useState(null);
  const [highResUrl, setHighResUrl] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const submitHandler = async (event) => {
    event.preventDefault();

    setLoading(true);

    let data = {
      userId: user._id,
      name: event.target[1].value,
      status: event.target[2].value
    }

    const highResUrlfirebaseUrl = await saveInFirebase(
      highResUrl,
      `users/${user._id}/profileImg/highResImg-${user._id}`
    );
    const lowResUrlfirebaseUrl = await saveInFirebase(
      lowResUrl,
      `users/${user._id}/profileImg/lowResImg-${user._id}`
    );

    data.highResUrl = highResUrlfirebaseUrl;
    data.lowResUrl = lowResUrlfirebaseUrl;

    dispatch(updateUserThunk({ data }))
      .unwrap()
      .finally(() => {
        setLoading(false);
      })
  };

  return (
    <form
      className="flex-center edit-profile"
      onSubmit={(event) => submitHandler(event)}
    >
      <h2 className="color-text-light">My Profile</h2>
      <ImageContainer
        highResUrl={user?.highResUrl}
        lowResUrl={user.lowResUrl}
        width="11rem"
        height="11rem"
        isEditable={true}
        editImageHandler={(newHighResUrl, newLowResUrl) => {
          setHighResUrl(newHighResUrl);
          setLowResUrl(newLowResUrl);
        }}
      />

      <CustomInput
        defaultValue={user?.name}
        type={"text"}
        label={"Name"}
        icon={"material-symbols:edit"}
        width="90%"
        maxWidth="20rem"
      />

      <CustomInput
        defaultValue={user?.status}
        type={"text"}
        label={"About Me"}
        icon={"material-symbols:edit"}
        width="90%"
        maxWidth="20rem"
      />

      <Button loading={loading} width={"50%"} backgroundColor={"var(--primary)"}>
        <h5 className="color-text">Save</h5>
      </Button>
    </form>
  );
};
export default EditProfile;
