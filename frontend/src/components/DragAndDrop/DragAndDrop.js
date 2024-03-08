import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../Button/Button";
import DragAndDropFiles from "./DragAndDropFiles/DragAndDropFiles";
import DragAndDropNoFiles from "./DragAndDropNoFiles/DragAndDropNoFiles";

import { categoryState } from "../../constants/constants";
import { OverlayActions } from "../../store/overlaySlice";
import { DragAndDropActions } from "../../store/dragAndDropSlice";
import { messageHandler } from "../../utils/SendMessage";
import {
  saveInFirebase,
} from "../../utils/SaveInFirebase";

import {getDropData} from "../../utils/GetDropData";

import AuthContext from "../../context/authContext";

import "./DragAndDrop.css";
import { UserActions } from "../../store/userSlice";

const DragAndDrop = () => {
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const [disabled, isDisabled] = useState(false);

  const user = useSelector((state) => state.user);

  let data = (user?.selectedType === categoryState[0]
    ? user.groups
    : user.privates
    ).filter(res => res._id === user.selectedId)[0]

  const files = useSelector((state) => state.dragAndDrop.files);

  useEffect(() => {
    return () => {
      dispatch(DragAndDropActions.removeAllFiles());
    };
  }, []);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDropHelper = (dragFile) => {
    let data = getDropData(dragFile);

    if (
      !files.find((file) => file.name === data.name) &&
      files.length <= 2 &&
      data.size <= 20 &&
      data.type
    )
      dispatch(DragAndDropActions.addFileHandler(data));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleDropHelper(event.dataTransfer.files[0]);
  };

  const saveMessage = (temp) => {
    dispatch(UserActions.saveMessage(temp));
  };


  const sendMessage = (url, file) => {
    let msgData = {
      token: authCtx.token,
      chatId: data._id,
      users: data.users,
      selectedType: user.selectedType,
      saveMessage: saveMessage,
      data: {
        message: '',
        isOpenAIMsg: false,
        url: url,
        size: file.size,
        type: file.type,
        userId: authCtx.userId,
      },
    };
    messageHandler(msgData);
  };


  const uploadHandler = (event) => {
    event.preventDefault();

    files.map((file) => {
      saveInFirebase(file.fileData)
        .then((url) => {
          sendMessage(url, file);
          dispatch(DragAndDropActions.removeSingleFile(file));
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <form
      className={"drag-and-drop-box border box-shadow"}
      onSubmit={(event) => uploadHandler(event)}
    >
      <div className={"close-btn"}>
        <Icon
          icon="mingcute:close-fill"
          onClick={() => dispatch(OverlayActions.closeOverlayHandler())}
        />
      </div>
      <h3>Uploads</h3>
      <div className={"drag-and-drop-box-condition"}>
        <p>Max Size: 20MB</p>
        <p>Max Files: 3</p>
      </div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={"drag-and-drop-box-upload"}
      >
        {files.length === 0 && (
          <DragAndDropNoFiles handleDropHelper={handleDropHelper} />
        )}
        {files.map((data) => (
          <DragAndDropFiles data={data} />
        ))}
      </div>
      {files.length > 0 && (
        <Button
         backgroundColor={"var(--primary)"} 
         width={"50%"}  >
          <p className="color-text">Send</p>
        </Button>
      )}
    </form>
  );
};

export default DragAndDrop;
