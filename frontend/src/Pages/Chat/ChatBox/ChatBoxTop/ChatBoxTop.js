import { useSelector } from "react-redux";
import { useState } from "react";

import ChatSettings from "../ChatSettings/ChatSettings";
import SideBar from "../../../../components/SideBar/SideBar";
import ImageContainer from "../../../../components/ImageContainer/ImageContainer";

import AuthContext from "../../../../context/authContext";
import { useContext } from "react";
import { Icon } from "@iconify/react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { categoryState } from "../../../../constants/constants";

import MediaCommunication from "./MediaCommunication/MediaCommunication";

import "./ChatBoxTop.css";

const ChatBoxTop = () => {
  const user = useSelector((state) => state.user);
  const authCtx = useContext(AuthContext);

  const data = (
    user?.selectedType === categoryState[0] ? user.groups : user.privates
  ).filter((res) => res._id === user.selectedId)[0];

  const [showSetting, setShowSetting] = useState(false);

  const closeSettingHandler = () => {
    setShowSetting(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeSettingHandler });

  return (
    <div className="border cursor-btn chat-box__top">
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
        <h5>
          {user.selectedType === categoryState[0]
            ? data.name
            : data.users.filter((user) => user._id !== authCtx.userId)[0].name}
        </h5>
        <p>
          {!(user.selectedType === categoryState[0])
            ? data.users.filter((user) => user._id !== authCtx.userId)[0].status
            : data.status}
        </p>
      </div>
      {user?.selectedType === categoryState[1] && <MediaCommunication />}
      <Icon
        onClick={() => setShowSetting((prevState) => !prevState)}
        ref={ref}
        icon="gg:more-vertical-o"
        className="cursor-btn"
        style={{ color: "var(--textX-light)", fontSize: "2.25rem" }}
      />
      {showSetting && <ChatSettings data={data} />}
    </div>
  );
};

export default ChatBoxTop;
