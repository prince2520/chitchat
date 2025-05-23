import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDetectClickOutside } from "react-detect-click-outside";

import { categoryState } from "../../../../constants/constants";
import { OverlayActions } from "../../../../redux/slice/overlaySlice";

import CustomEmoji from "./CustomEmoji/CustomEmoji";

import { createGroupMessageThunk, createPrivateMessageThunk } from "../../../../redux/thunk/chatThunk";
import { getAIAnswer } from "../../../../geminiai";
import { toast } from "react-toastify";
import GeminiAI from "./GeminiAI/GeminiAI";

import "./ChatBoxBottom.css";


const ChatBoxBottom = () => {
  const [showEmojis, setShowEmojis] = useState(false);
  const [isOpenAIMsg, setIsOpenAIMsg] = useState(false);


  const inputRef = useRef(null);
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  const data = (
    chat.selectedType === categoryState[0] ? chat.groups : chat.privates
  ).filter((res) => res._id === chat.selectedId)[0];

  const createMessageHandler = (selectedType, msgData) => {
    if (selectedType === categoryState[0]) {
      dispatch(createGroupMessageThunk({ data: msgData }));
    } else {
      dispatch(createPrivateMessageThunk({ data: msgData }))
    }
  }

  const sendMessage = (event) => {
    event.preventDefault();
    setShowEmojis(false);

    let message = inputRef.current.value;

    if (message === "") return;

    let msgData = {
      token: user.token,
      chatId: data._id,
      users: data.users,
      selectedType: chat.selectedType,
      name: data.name,
      data: {
        message: message,
        isOpenAIMsg: isOpenAIMsg,
        url: "",
        size: 0,
        type: "string",
        userId: user._id,
      },
    };

    createMessageHandler(chat.selectedType, msgData);

    inputRef.current.value = "";

    if(isOpenAIMsg){
      getAIAnswer(message).then(res=>{
        let temp = {...msgData};

        temp.data.message = res.text;
        temp.data.isOpenAIMsg = true;

        createMessageHandler(temp.selectedType, temp);

        }).catch(err=>toast.error(err));
    }
  }

  const isGeminiAIHandler = (openAICond) => setIsOpenAIMsg(openAICond);

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
          onClick={() => dispatch(OverlayActions.openDragDropReducer())}
          icon="tabler:files"
        />
        <GeminiAI isGeminiAIHandler={isGeminiAIHandler} />
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
