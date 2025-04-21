import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SocketContextProvider } from "../../context/socketContext";

import ChatTab from "./ChatTab/ChatTab";
import ChatBox from "./ChatBox/ChatBox";
import Overlay from "../../components/Overlay/Overlay";
import { ChatActions } from "../../redux/slice/chatSlice";
import NotSelectedChat from "./NotSelectedChat/NotSelectedChat";

import "./Chat.css";


export const Chat = () => {
  const isSelected = useSelector((state) => state.chat.isSelected);
  const showOverlay = useSelector((state) => state.overlay?.showOverlay);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(
        ChatActions.selectedChat({
          isSelected: false,
          selectedId: null,
          selectedType: null,
        })
      );
    };
  }, [dispatch]);

  return (
    <SocketContextProvider>
      <div className="flex-center box-shadow border chat-page">
        {showOverlay && <Overlay />}
        <div className={"chat-tab__container"}>
          <ChatTab />
        </div>
        {isSelected ? <ChatBox /> : <NotSelectedChat />}
      </div>
    </SocketContextProvider>
  );
};
