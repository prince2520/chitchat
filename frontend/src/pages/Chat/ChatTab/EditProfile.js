import { toast } from "react-toastify";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../../../api/user";
import { UserActions } from "../../../reduxs/slice/userSlice";
import { saveInFirebase } from "../../../utils/SaveInFirebase";

import Button from "../../../components/Button/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";
import ImageContainer from "../../../components/ImageContainer/ImageContainer";

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [lowResUrl, setLowResUrl] = useState(null);
  const [highResUrl, setHighResUrl] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const saveProfileBackend = (
    name,
    status,
    highResUrl = null,
    lowResUrl = null
  ) => {
    let data = {
      userId: user._id,
      name: name,
      status: status,
    };
    if (highResUrl && lowResUrl) {
      data["highResUrl"] = highResUrl;
      data["lowResUrl"] = lowResUrl;
    }
    return updateUser(user.token, data);
  };

  const saveProfileDetail = async (name, status) => {
    const highResUrlfirebaseUrl = await saveInFirebase(
      highResUrl,
      `users/${user._id}/profileImg/highResImg-${user._id}`
    );
    const lowResUrlfirebaseUrl = await saveInFirebase(
      lowResUrl,
      `users/${user._id}/profileImg/lowResImg-${user._id}`
    );

    setLoading(true);

    saveProfileBackend(
      name,
      status,
      highResUrlfirebaseUrl,
      lowResUrlfirebaseUrl
    )
      .then((result) => {
        setLoading(false);
        if (result.success) {
          let updatedUser = {
            name: name,
            status: status
          }

          if (highResUrl || lowResUrl) {
            updatedUser['highResUrl'] = highResUrlfirebaseUrl;
            updatedUser['lowResUrl'] = lowResUrlfirebaseUrl;
          }

          dispatch(
            UserActions.saveUserData(updatedUser)
          );
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let name, status;

    name = event.target[1].value;
    status = event.target[2].value;

    saveProfileDetail(name, status);
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
