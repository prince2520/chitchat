import { uid } from "uid";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useDetectClickOutside } from "react-detect-click-outside";

import useLeaveDeleteGroup from "../../../../hooks/useLeaveDeleteGroup";
import MediaCommunication from "../ChatBoxTop/MediaCommunication/MediaCommunication";

import { categoryState } from "../../../../constants/constants";
import { OverlayActions } from "../../../../redux/slice/overlaySlice";
import { chatTopSettingOptions } from "../../../../constants/constants";

import "./ChatSettings.css";

const ChatSettings = ({ closeSettingHandler }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const selectedType = chat.selectedType;


  const { handleDeleteChat } = useLeaveDeleteGroup();

  const data = (
    selectedType === categoryState[0] ? chat.groups : chat.privates
  ).filter((res) => res._id === chat.selectedId)[0];

  const ref = useDetectClickOutside({ onTriggered: closeSettingHandler });

  // check if user is admin of chat
  const isAdmin = () => {
    if (selectedType === categoryState[1]) return true;
    return user._id === data.createdBy;
  };

  return (
    <div ref={ref} className="flex-center box-shadow border chat-settings">
      {selectedType === categoryState[0] &&
        chatTopSettingOptions.map((option) => {
          if (
            chatTopSettingOptions[2].title === option.title &&
            !(user._id === data.createdBy)
          ) {
            return null;
          }
          return (
            <div
              key={uid(32)}
              className={"cursor-btn flex-center chat-settings__option"}
              onClick={() => {
                setTimeout(() => {
                  closeSettingHandler();
                  dispatch(
                    OverlayActions.openSettingsHandler({
                      value: true,
                      link: option.title,
                    })
                  );
                }, [50]);
              }}
            >
              <Icon className="color-text-light" icon={option.icon} />
              <h5 className="color-text-light">{option.title}</h5>
            </div>
          );
        })}
      {selectedType === categoryState[1] && (
        <MediaCommunication closeSettingHandler={closeSettingHandler} />
      )}
      <div
        className="cursor-btn flex-center chat-settings__option"
        onClick={() => handleDeleteChat()}
      >
        <Icon
          color="var(--error)"
          className="color-text-light"
          icon={"material-symbols:delete-outline"}
        />
        <h5 style={{ color: "var(--error)" }}>
          {isAdmin() ? "Delete" : "Leave"}
        </h5>
      </div>
    </div>
  );
};

export default ChatSettings;
