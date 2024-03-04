import { Icon } from "@iconify/react";
import { useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import OpenAI from "./OpenAI/OpenAI";
import CustomEmoji from "./CustomEmoji/CustomEmoji";

import { messageHandler } from "../../sendMessage";
import { OverlayActions } from "../../../../store/overlay";

import AuthContext from "../../../../context/authContext";

import { categoryState } from "../../../../common";
import { useSelector } from "react-redux";
import { UserActions } from "../../../../store/user";
import { useDetectClickOutside } from "react-detect-click-outside";

import "./ChatBoxBottom.css";

const ChatBoxBottom = () => {
  const inputRef = useRef(null);

  const authCtx = useContext(AuthContext);

  const dispatch = useDispatch();

  const user = useSelector(state=>state.user);
  const data = (user?.selectedType === categoryState[0]
    ? user.groups
    : user.privates
    ).filter(res => res._id === user.selectedId)[0];

  const [showEmojis, setShowEmojis] = useState(false);
  const [isOpenAIMsg, setIsOpenAIMsg] = useState(false);

  const saveMessage = (temp) => {
    dispatch(UserActions.saveMessage(temp));
  };

  const sendMessage = (event) => {
    event.preventDefault();
    setShowEmojis(false);

    let message = inputRef.current.value;

    if (message === "") return;

    let msgData = {
      token: authCtx.token,
      chatId: data._id,
      users: data.users,
      selectedType: user.selectedType,
      saveMessage: saveMessage,
      data: {
        message: message,
        isOpenAIMsg: isOpenAIMsg,
        url: "",
        size: 0,
        type: "string",
        userId: authCtx.userId,
      },
    };
    messageHandler(msgData);
    inputRef.current.value = "";
  };

  const isOpenAIHandler = (openAICond) => setIsOpenAIMsg(openAICond);

  const closeEmojiHandler = () => {
    setShowEmojis(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeEmojiHandler });

  return (
    <form
      ref={ref}
      onSubmit={(event) => sendMessage(event)}
      className="chat-box-bottom "
    >
      <div className={"chat-box-bottom-left"}>
        <Icon
          className={"smile-icon cursor-btn"}
          onClick={() => {
            setShowEmojis(!showEmojis);
          }}
          icon="emojione:winking-face"
        />
        <Icon
          className={"files-icon"}
          onClick={() => dispatch(OverlayActions.openDragDropHandler())}
          icon="tabler:files"
        />
        <OpenAI isOpenAIHandler={isOpenAIHandler} />
      </div>
      <div className={"chat-box-bottom-middle border"}>
        <input ref={inputRef} type="text" placeholder={"Type Something ..."} />
      </div>
      <div className="chat-box-bottom-right  align-center icon-container">
        <button className={"send-msg-button cursor-btn align-center"}>
          <Icon icon="mingcute:send-line" />
        </button>
      </div>
      {showEmojis && (
        <CustomEmoji setShowEmojis={setShowEmojis} inputRef={inputRef} />
      )}
    </form>
  );
};

export default ChatBoxBottom;
