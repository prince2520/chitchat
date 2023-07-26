import ChatTab from "./ChatTab/ChatTab";
import ChatBox from "./ChatBox/ChatBox";

import  './Chat.css';
import Overlay from "../../Helper/Overlay/Overlay";
import {useDispatch, useSelector} from "react-redux";
import NotSelectedChat from "./NotSelectedChat/NotSelectedChat";
import {disconnectSocket, getGroupMessage, initiateSocket} from "../../socket";
import {useContext, useEffect} from "react";
import AuthContext from "../../Context/auth";
import {ChatActions} from "../../store/chat";
import DragAndDrop from "../../Helper/DragAndDrop/DragAndDrop";
const Chat = () => {
    const showOverlay = useSelector(state => state.overlay?.showOverlay);
    const selectedChatBox = useSelector(state => state.chat.selected);
    const authCtx = useContext(AuthContext);
    const showDropAndDrag = useSelector(state => state.dragAndDrop.showDragAndDrop);

    const dispatch = useDispatch();

    useEffect(()=>{
        initiateSocket(authCtx?.userId);
        return ()=>{
            disconnectSocket(authCtx?.userId)
        }
    },[authCtx?.userId])

    const saveMessage = (data) => {
        dispatch(ChatActions.saveChatMessage(data));
    }

    useEffect(() => {
        getGroupMessage((err, {messageData}) => {
            let data = {
                chatId: messageData.chatId,
                username: messageData.username,
                message: messageData.message,
                profileImageUrl: messageData.profileImageUrl,
                isOpenAIMsg: messageData.isOpenAIMsg
            };
            saveMessage(data);
        });
    },[]);



    return (
        <div className="chat-page box-shadow border">
            {showOverlay && <Overlay/>}
            {showDropAndDrag && <DragAndDrop/>}
            <div className={'chat-tab-container'}>
                <ChatTab/>
            </div>
            {selectedChatBox ? <ChatBox/> : <NotSelectedChat/>}
        </div>
    );
};
export default Chat;