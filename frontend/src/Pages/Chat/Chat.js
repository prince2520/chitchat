import { useSelector } from "react-redux";

import ChatTab from "./ChatTab/ChatTab";
import ChatBox from "./ChatBox/ChatBox";
import Overlay from "../../components/Overlay/Overlay";
import NotSelectedChat from "./NotSelectedChat/NotSelectedChat";

import { SocketContextProvider } from "../../context/socketContext";

import "./Chat.css";

const Chat = () => {
  const showOverlay = useSelector((state) => state.overlay?.showOverlay);
  const selectedChatBox = useSelector((state) => state.chat.selected);

  return (
    <SocketContextProvider>
      <div className="flex-center chat-page box-shadow border">
        {showOverlay && <Overlay />}
        <div className={"chat-tab-container"}>
          <ChatTab />
        </div>
        {selectedChatBox ? <ChatBox /> : <NotSelectedChat />}
      </div>
    </SocketContextProvider>
  );
};
export default Chat;
