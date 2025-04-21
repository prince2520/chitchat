import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryState } from "../constants/constants";
import { socketRemoveChat } from "../services/socket";
import { OverlayActions } from "../redux/slice/overlaySlice";
import { deleteGroupThunk, deletePrivateThunk, leaveGroupThunk } from "../redux/thunk/chatThunk";

const useLeaveDeleteGroup = () => {
  const dispatch = useDispatch();

  const [leaveDeleteloading, setLeaveDeleteloading] = useState(false);

  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  
  const selectedType = chat.selectedType;
  const selectedId = chat.selectedId;

  const data = (
    selectedType === categoryState[0] ? chat.groups : chat.privates
  ).filter((res) => res._id === chat.selectedId)[0];

  // check if user is admin of chat
  const isUserAdmin = () => {
    if (selectedType === categoryState[1]) return true;
    return user._id === data.createdBy;
  };


   // delete this chat from all users using socket
   const deleteChatToAllUser = (chatId, chatType, isAdmin) => {
    if (isAdmin) {
      let socketData = {
        type: chatType,
        chatId: chatId,
      };
      
      // get other person Id
      if (chatType === categoryState[1]) {
        const otherPrivateUserId = data.users.filter(
          (u) => u._id !== user._id
        )[0]._id;
        socketData["privatUserId"] = otherPrivateUserId;
      }

      socketRemoveChat(socketData);
    }
  };

  const handleDeleteChat = () => {
    const chatId = selectedId;
    const isAdmin = isUserAdmin();
    const chatType = selectedType;

    setLeaveDeleteloading(true);

    (() => {
      if (selectedType === categoryState[0])
        return isAdmin ? dispatch(deleteGroupThunk({ chatId, chatType })) : dispatch(leaveGroupThunk({ chatId, chatType }));
      else
        return dispatch(deletePrivateThunk({ chatId, chatType }));
    })().unwrap()
      .finally(() => {
        dispatch(OverlayActions.closeOverlayHandler());
        setLeaveDeleteloading(false);

        // Using Socket
        deleteChatToAllUser(chatId, selectedType, isAdmin);
      })

    return { handleDeleteChat, leaveDeleteloading };
  }
  
  return { handleDeleteChat, leaveDeleteloading };
};

export default useLeaveDeleteGroup;
