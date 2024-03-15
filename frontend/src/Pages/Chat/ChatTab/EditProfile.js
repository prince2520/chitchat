import { useDispatch, useSelector } from "react-redux";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

import Button from "../../../components/Button/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";
import ImageContainer from "../../../components/ImageContainer/ImageContainer";

import { updateUser } from "../../../api/user";
import { UserActions } from "../../../store/userSlice";
import { saveInFirebase } from "../../../utils/SaveInFirebase";

import AuthContext from "../../../context/authContext";

const EditProfile = () => {
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const user = useSelector((state) => state.user);

  const [lowResUrl, setLowResUrl] = useState(null);
  const [highResUrl, setHighResUrl] = useState(null);

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

    let highResUrlfirebaseUrl = await saveInFirebase(highResUrl);
    let lowResUrlfirebaseUrl = await saveInFirebase(lowResUrl);

    saveProfileBackend(
      name,
      status,
      highResUrlfirebaseUrl,
      lowResUrlfirebaseUrl
    )
      .then((result) => {
        if (result.success) {
          dispatch(
            UserActions.saveUserData({
              name: name,
              status: status,
              highResUrl: highResUrlfirebaseUrl,
              lowResUrl: lowResUrlfirebaseUrl,
            })
          );
          toast.success(result.msg);
        } else {
          toast.error(result.msg);
        }
      })
      .catch((err) => toast.error(err));
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
      <h3 className="color-text-light">My Profile</h3>

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

      <Button width={"50%"} backgroundColor={"var(--primary)"}>
        <p className="color-text">Save</p>
      </Button>
    </form>
  );
};
export default EditProfile;
