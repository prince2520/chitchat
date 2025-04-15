import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../reduxs/slice/userSlice";
import { toast } from "react-toastify";
import { socketLeaveMemberGroup } from "../services/socket";

import { deleteGroup } from "../api/group";
import { deletePrivate } from "../api/private";
import { leaveGroup } from "../api/group";
import { categoryState } from "../constants/constants";
import { socketRemoveChat } from "../services/socket";
import { OverlayActions } from "../reduxs/slice/overlaySlice";

const useLeaveDeleteGroup = () => {
  const dispatch = useDispatch();

  const [leaveDeleteloading, setLeaveDeleteloading] = useState(false);

  const user = useSelector((state) => state.user);
  const selectedType = user.selectedType;
  const selectedId = user.selectedId;

  const data = (
    selectedType === categoryState[0] ? user.groups : user.privates
  ).filter((res) => res._id === user.selectedId)[0];

  // check if user is admin of chat
  const isAdmin = () => {
    if (selectedType === categoryState[1]) return true;
    return user._id === data.createdBy;
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
          (user) => user._id !== user._id
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
    const userId = user._id;
    const isUserAdmin = isAdmin();

    setLeaveDeleteloading(true);

    (selectedType === categoryState[0]
      ? isUserAdmin
        ? deleteGroup
        : leaveGroup
      : deletePrivate)({
      token: user.token,
      chatId: chatId,
    })
      .then(async (res) => {
        setLeaveDeleteloading(false);
        if (res.success) {
          dispatch(OverlayActions.closeOverlayHandler());
          if (selectedType === categoryState[0] && !isUserAdmin) {
            socketLeaveMemberGroup({
              groupId: chatId,
              userId: userId,
            });
          }
          deleteAllUserChat(chatId, type);
          dispatchDeleteChat(chatId, type);
          toast.success(res.message);
        } else {
          setLeaveDeleteloading(false);
          toast.error(res.message);
        }
      })
      .catch((err) => {
        setLeaveDeleteloading(false);
        toast.error(err.message);
      });
  };

  return { handleDeleteChat, leaveDeleteloading };
};

export default useLeaveDeleteGroup;
