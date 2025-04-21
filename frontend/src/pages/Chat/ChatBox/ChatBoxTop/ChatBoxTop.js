import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { useState } from "react";

import { categoryState } from "../../../../constants/constants";

import ChatSettings from "../ChatSettings/ChatSettings";
import SideBar from "../../../../components/SideBar/SideBar";
import ImageContainer from "../../../../components/ImageContainer/ImageContainer";

import "./ChatBoxTop.css";

const ChatBoxTop = () => {
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  
  const [showSetting, setShowSetting] = useState(false);

  const data = (
    chat?.selectedType === categoryState[0] ? chat.groups : chat.privates
  ).filter((res) => res._id === chat.selectedId)[0];

  const closeSettingHandler = () => {
    setShowSetting(false);
  };


  return (
    <div className="border chat-box__top">
      <SideBar />
      <ImageContainer
        highResUrl={
          chat.selectedType === categoryState[1]
            ? data.users.filter((u) => u._id !== user._id)[0]
                .highResUrl
            : data.highResUrl
        }
        lowResUrl={
          chat.selectedType === categoryState[1]
            ? data.users.filter((u) => u._id !==  user._id)[0]
                .lowResUrl
            : data.lowResUrl
        }
        width="3.5rem"
        height="3.5rem"
      />
      <div className="full-screen chat-box__description">
        <h5 className="color-text-light">
          {chat.selectedType === categoryState[0]
            ? data.name
            : data.users.filter((u) => u._id !==  user._id)[0].name}
        </h5>
        <p className="color-text-light">
          {!(chat.selectedType === categoryState[0])
            ? data.users.filter((u) => u._id !==  user._id)[0].status
            : data.status}
        </p>
      </div>
      <Icon
        onClick={() => setTimeout(()=>setShowSetting((prevState) => !prevState),[50])}
        icon="gg:more-vertical-o"
        className="cursor-btn"
        style={{ fontSize: "2.25rem" }}
      />
      {showSetting && <ChatSettings closeSettingHandler={closeSettingHandler} data={data} />}
    </div>
  );
};

export default ChatBoxTop;
