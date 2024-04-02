import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { useState, useContext } from "react";

import { categoryState } from "../../../../constants/constants";

import ChatSettings from "../ChatSettings/ChatSettings";
import AuthContext from "../../../../context/authContext";
import SideBar from "../../../../components/SideBar/SideBar";
import MediaCommunication from "./MediaCommunication/MediaCommunication";
import ImageContainer from "../../../../components/ImageContainer/ImageContainer";

import "./ChatBoxTop.css";

const ChatBoxTop = () => {
  const [showSetting, setShowSetting] = useState(false);

  const authCtx = useContext(AuthContext);
  const user = useSelector((state) => state.user);

  const data = (
    user?.selectedType === categoryState[0] ? user.groups : user.privates
  ).filter((res) => res._id === user.selectedId)[0];

  const closeSettingHandler = () => {
    setShowSetting(false);
  };


  return (
    <div className="border chat-box__top">
      <SideBar />
      <ImageContainer
        highResUrl={
          user.selectedType === categoryState[1]
            ? data.users.filter((user) => user._id !== authCtx.userId)[0]
                .highResUrl
            : data.highResUrl
        }
        lowResUrl={
          user.selectedType === categoryState[1]
            ? data.users.filter((user) => user._id !== authCtx.userId)[0]
                .lowResUrl
            : data.lowResUrl
        }
      />
      <div className="full-screen chat-box__description">
        <h5 className="color-text-light">
          {user.selectedType === categoryState[0]
            ? data.name
            : data.users.filter((user) => user._id !== authCtx.userId)[0].name}
        </h5>
        <p className="color-text-light">
          {!(user.selectedType === categoryState[0])
            ? data.users.filter((user) => user._id !== authCtx.userId)[0].status
            : data.status}
        </p>
      </div>
      {user?.selectedType === categoryState[1] && <MediaCommunication />}
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
