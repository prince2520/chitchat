import { uid } from "uid";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../../Button/Button";
import DragAndDropFiles from "./DragAndDropFiles/DragAndDropFiles";
import DragAndDropNoFiles from "./DragAndDropNoFiles/DragAndDropNoFiles";

import { categoryState } from "../../../../constants/constants";
import { OverlayActions } from "../../../../redux/slice/overlaySlice";
import { saveInFirebase } from "../../../../utils/SaveInFirebase";
import { DragAndDropActions } from "../../../../redux/slice/dragAndDropSlice";

import { getDropData } from "../../../../utils/GetDropData";

import "./DragAndDrop.css";
import { createGroupMessageThunk, createPrivateMessageThunk } from "../../../../redux/thunk/chatThunk";

const DragAndDrop = () => {
  const dispatch = useDispatch();


  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);

  const [loading, setLoading] = useState(false);

  let data = (
    chat.selectedType === categoryState[0] ? chat.groups : chat.privates
  ).filter((res) => res._id === chat.selectedId)[0];

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
    const data = getDropData(dragFile);

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

  const sendMessage = (url, file) => {
    let msgData = {
      token: user.token,
      chatId: data._id,
      users: data.users,
      selectedType: chat.selectedType,
      data: {
        message: file.name,
        isOpenAIMsg: false,
        url: url,
        size: file.size,
        type: file.type,
        userId: user._id,
      }
    };

    if (chat.selectedType === categoryState[0]) {
      dispatch(createGroupMessageThunk({ data: msgData }))
    } else {
      dispatch(createPrivateMessageThunk({ data: msgData }))
    }
  };

  const uploadHandler = (event) => {
    event.preventDefault();
    files.map((file) => {
      saveInFirebase(file.fileData, `${categoryState[0] === data.selectedType ? 'groups' : 'privates'}/${chat.selectedId}/media/${user._id}-${uid(32)}`)
        .then((url) => {
          sendMessage(url, file);
          dispatch(DragAndDropActions.removeSingleFile(file));
        })
        .catch((err) => console.log(err)).finally(() => {
          setLoading(false);
        });
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
        <Button loading={loading} backgroundColor={"var(--primary)"} width={"50%"}>
          <h5 className="color-text">Send</h5>
        </Button>
      )}
    </form>
  );
};

export default DragAndDrop;
