import {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import ChatTab from "./ChatTab/ChatTab";
import ChatBox from "./ChatBox/ChatBox";
import Overlay from "../../Helper/Overlay/Overlay";
import DragAndDrop from "../../Helper/DragAndDrop/DragAndDrop";
import NotSelectedChat from "./NotSelectedChat/NotSelectedChat";

import {disconnectSocket, getGroupMessage, initiateSocket} from "../../socket";
import {ChatActions} from "../../store/chat";

import AuthContext from "../../Context/auth";

import  './Chat.css';

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
            console.log(messageData)
            saveMessage(messageData);
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