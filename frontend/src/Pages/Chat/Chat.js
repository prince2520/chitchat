import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChatTab from "./ChatTab/ChatTab";
import ChatBox from "./ChatBox/ChatBox";
import Overlay from "../../components/Overlay/Overlay";
import NotSelectedChat from "./NotSelectedChat/NotSelectedChat";

import { UserActions } from "../../store/userSlice";
import { SocketContextProvider } from "../../context/socketContext";

import "./Chat.css";

export const Chat = () => {
  const isSelected = useSelector((state) => state.user.isSelected);
  const showOverlay = useSelector((state) => state.overlay?.showOverlay);

  const dispatch  = useDispatch();

  useEffect (() => {
    return () => {
      dispatch(UserActions.selectedChat({
        isSelected : false,
        selectedId : null,
        selectedType : null
      }))
    };
  },[dispatch])

  return (
    <SocketContextProvider>
      <div className="flex-center box-shadow border chat-page">
        {showOverlay && <Overlay />}
        <div className={"chat-tab-container"}>
          <ChatTab />
        </div>
        {isSelected ? <ChatBox /> : <NotSelectedChat />}
      </div>
    </SocketContextProvider>
  );
};
