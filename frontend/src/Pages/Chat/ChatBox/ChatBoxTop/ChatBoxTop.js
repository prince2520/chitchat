import { useSelector } from "react-redux";
import { useState } from "react";

import Setting from "./Setting/Setting";
import SideBar from "../../../../components/SideBar/SideBar";
import ImageContainer from "../../../../components/ImageContainer/ImageContainer";

import AuthContext from "../../../../context/authContext";
import { useContext } from "react";
import { Icon } from "@iconify/react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { categoryState } from "../../../../common";

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
    <div className="chat-box-top border">
      <SideBar />
      <ImageContainer
        src={
          user.selectedType === categoryState[1]
            ? data.users.filter((user) => user._id !== authCtx.userId)[0]
                .profileImageUrl
            : data.groupImageUrl
        }
      />
      <div className="chat-description">
        <h5>
          {user.selectedType === categoryState[0]
            ? data.name
            : data.users.filter((user) => user._id !== authCtx.userId)[0].name}
        </h5>
        <p>
          {!(user.selectedType === categoryState[0])
            ? data.users.filter((user) => user._id !== authCtx.userId)[0].status
            : data._id}
        </p>
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
