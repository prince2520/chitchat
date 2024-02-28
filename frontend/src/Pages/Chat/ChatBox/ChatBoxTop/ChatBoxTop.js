import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Setting from "./Setting/Setting";
import SideBar from "../../../../components/SideBar/SideBar";
import ImageContainer from "../../../../components/ImageContainer/ImageContainer";

import { Icon } from "@iconify/react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { categoryState } from "../../../../common";

import MediaCommunication from "./MediaCommunication/MediaCommunication";

import "./ChatBoxTop.css";

const ChatBoxTop = ({data}) => {

  const [showSetting, setShowSetting] = useState(false);

  const closeSettingHandler = () => {
    setShowSetting(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeSettingHandler });

  return (
    <div className="chat-box-top border">
      <SideBar />
      <ImageContainer src={data.groupImageUrl} />
      <div className="chat-description">
        <h5>{data.name}</h5>
        <p>{data.status ? data.status : data.createdBy}</p>
      </div>
      {data.type === categoryState[1] && <MediaCommunication />}
      <Icon
        onClick={() => setShowSetting((prevState) => !prevState)}
        ref={ref}
        icon="gg:more-vertical-o"
        className="cursor-btn"
        style={{ color: "var(--text-light)", fontSize: "2.25rem" }}
      />
      {showSetting && <Setting />}
    </div>
  );
};

export default ChatBoxTop;
