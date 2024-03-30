import { uid } from "uid";
import { useContext } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";

import { OverlayActions } from "../../../../store/overlaySlice";
import { categoryState } from "../../../../constants/constants";
import { chatTopSettingOptions } from "../../../../constants/constants";

import AuthContext from "../../../../context/authContext";
import useLeaveDeleteGroup from "../../../../hooks/useLeaveDeleteGroup"

import "./ChatSettings.css";

const ChatSettings = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const selectedType = user.selectedType;

  const authCtx = useContext(AuthContext);

  const {handleDeleteChat} = useLeaveDeleteGroup();

  const data = (
    selectedType === categoryState[0] ? user.groups : user.privates
  ).filter((res) => res._id === user.selectedId)[0];

  // check if user is admin of chat
  const isAdmin = () => {
    if (selectedType === categoryState[1]) return true;
    return authCtx.userId === data.createdBy;
  };


  return (
    <div className="flex-center box-shadow border chat-settings">
      {selectedType === categoryState[0] &&
        chatTopSettingOptions.map((option) => {
          if(chatTopSettingOptions[2].title === option.title && ! (authCtx.userId === data.createdBy)){
            return null;
          }
          return (<div
            key={uid(32)}
            className={"cursor-btn flex-center chat-settings__option"}
            onClick={() =>
              dispatch(
                OverlayActions.openSettingsHandler({
                  value: true,
                  link: option.title,
                })
              )
            }
          >
            <Icon className="color-text-light" icon={option.icon} />
            <h5 className="color-text-light">{option.title}</h5>
          </div>)
        })}
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
