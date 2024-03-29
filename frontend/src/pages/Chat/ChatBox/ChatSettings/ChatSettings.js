import { uid } from "uid";
import { useContext } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { socketLeaveMemberGroup, socketRemoveChat } from "../../../../socket";
import { deletePrivate } from "../../../../api/private";
import { UserActions } from "../../../../store/userSlice";
import { OverlayActions } from "../../../../store/overlaySlice";
import { categoryState } from "../../../../constants/constants";
import { deleteGroup, leaveGroup } from "../../../../api/group";
import { chatTopSettingOptions } from "../../../../constants/constants";

import AuthContext from "../../../../context/authContext";

import "./ChatSettings.css";

const ChatSettings = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const selectedType = user.selectedType;
  const selectedId = user.selectedId;

  const authCtx = useContext(AuthContext);

  const data = (
    selectedType === categoryState[0] ? user.groups : user.privates
  ).filter((res) => res._id === user.selectedId)[0];

  // check if user is admin of chat
  const isAdmin = () => {
    if (selectedType === categoryState[1]) return true;
    return authCtx.userId === data.createdBy;
  };

  // delete this chat from all users using socket
  const deleteAllUserChat = (chatId, type) => {
    if (isAdmin()) {
      let socketData = {
        type: type,
        chatId: chatId,
      };
      if (selectedType === categoryState[1]) {
        const privateUserId = data.users.filter(
          (user) => user._id !== authCtx.userId
        )[0]._id;
        socketData["privatUserId"] = privateUserId;
      }
      socketRemoveChat(socketData);
    }
  };

  // dispatch delete chat and unselect the chat
  const dispatchDeleteChat = (chatId, type) => {
    dispatch(
      UserActions.selectedChat({
        selectedId: null,
        selectedType: null,
        isSelected: false,
      })
    );
    dispatch(
      UserActions.deleteChat({
        type: type,
        chatId: chatId,
      })
    );
  };

  // delete chat
  const handleDeleteChat = () => {
    const chatId = selectedId;
    const type = selectedType;
    const userId = authCtx.userId;
    const isUserAdmin = isAdmin();


    (selectedType === categoryState[0]
      ? isUserAdmin
        ? deleteGroup
        : leaveGroup
      : deletePrivate)({
      token: authCtx.token,
      chatId: chatId,
    })
      .then(async (res) => {
        if (res.success) {

          if(selectedType === categoryState[0] && !isUserAdmin ){
            socketLeaveMemberGroup({
              groupId: chatId,
              userId: userId
            });
          }
          deleteAllUserChat(chatId, type);
          dispatchDeleteChat(chatId, type);
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="flex-center box-shadow border chat-settings">
      {selectedType === categoryState[0] &&
        chatTopSettingOptions.map((option) => (
          <div
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
          </div>
        ))}
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
