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
const Chat = () => {
    const showOverlay = useSelector(state => state.overlay?.showOverlay);
    const selectedChatBox = useSelector(state => state.chat.selected);
    const authCtx = useContext(AuthContext);

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
            console.log(messageData);
            let data = {
                chatId: messageData.chatId,
                username: messageData.username,
                message: messageData.message,
                profileImageUrl: messageData.profileImageUrl
            };
            saveMessage(data);
        });
    },[]);



    return (
        <div className="chat-page box-shadow border">
            {showOverlay && <Overlay/>}
            <div className={'chat-tab-container'}>
                <ChatTab/>
            </div>
            {selectedChatBox ? <ChatBox/> : <NotSelectedChat/>}
        </div>
    );
};
export default Chat;