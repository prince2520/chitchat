import { Icon } from "@iconify/react";
import { useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDetectClickOutside } from "react-detect-click-outside";

import { UserActions } from "../../../../store/userSlice";
import { messageHandler } from "../../../../utils/SendMessage";
import { categoryState } from "../../../../constants/constants";
import { OverlayActions } from "../../../../store/overlaySlice";

import OpenAI from "./OpenAI/OpenAI";
import CustomEmoji from "./CustomEmoji/CustomEmoji";
import AuthContext from "../../../../context/authContext";

import "./ChatBoxBottom.css";

const ChatBoxBottom = () => {  
  const [showEmojis, setShowEmojis] = useState(false);
  const [isOpenAIMsg, setIsOpenAIMsg] = useState(false);


  const inputRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const data = (
    user?.selectedType === categoryState[0] ? user.groups : user.privates
  ).filter((res) => res._id === user.selectedId)[0];

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
      className="flex-center chat-box__bottom "
    >
      <div className={"flex-center chat-box__bottom__left"}>
        <Icon
          className={"cursor-btn smile__icon"}
          onClick={() => {
            setShowEmojis(!showEmojis);
          }}
          icon="emojione:winking-face"
        />
        <Icon
          className={"cursor-btn files__icon"}
          onClick={() => dispatch(OverlayActions.openDragDropHandler())}
          icon="tabler:files"
        />
        {/*<OpenAI isOpenAIHandler={isOpenAIHandler} />*/}
      </div>
      <div
        className={" hoverState flex-center border chat-box__bottom__middle"}
      >
        <input ref={inputRef} type="text" placeholder={"Type Something ..."} />
      </div>
      <div className="flex-center icon__container chat-box__bottom__right">
        <button className={"cursor-btn flex-center send-msg__button"}>
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
