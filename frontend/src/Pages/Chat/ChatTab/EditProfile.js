import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../../../api/user";
import { UserActions } from "../../../store/userSlice";
import { saveInFirebase } from "../../../utils/SaveInFirebase";

import AuthContext from "../../../context/authContext";
import Button from "../../../components/Button/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";
import ImageContainer from "../../../components/ImageContainer/ImageContainer";

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [lowResUrl, setLowResUrl] = useState(null);
  const [highResUrl, setHighResUrl] = useState(null);

  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const user = useSelector((state) => state.user);

  const saveProfileBackend = (
    name,
    status,
    highResUrl = null,
    lowResUrl = null
  ) => {
    let data = {
      userId: authCtx.userId,
      name: name,
      status: status,
    };
    if (highResUrl && lowResUrl) {
      data["highResUrl"] = highResUrl;
      data["lowResUrl"] = lowResUrl;
    }
    return updateUser(authCtx.token, data);
  };

  const saveProfileDetail = async (name, status) => {
    if (!highResUrl || !lowResUrl) {
      return;
    }

    const highResUrlfirebaseUrl = await saveInFirebase(
      highResUrl,
      `users/${authCtx.userId}/profileImg/highResImg-${authCtx.userId}`
    );
    const lowResUrlfirebaseUrl = await saveInFirebase(
      lowResUrl,
      `users/${authCtx.userId}/profileImg/lowResImg-${authCtx.userId}`
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
          dispatch(
            UserActions.saveUserData({
              name: name,
              status: status,
              highResUrl: highResUrlfirebaseUrl,
              lowResUrl: lowResUrlfirebaseUrl,
            })
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
