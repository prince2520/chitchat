import {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import ChatTab from "./ChatTab/ChatTab";
import ChatBox from "./ChatBox/ChatBox";
import Overlay from "../../components/Overlay/Overlay";
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop";
import NotSelectedChat from "./NotSelectedChat/NotSelectedChat";

import {disconnectSocket, getGroupMessage, initiateSocket} from "../../socket";
import {ChatActions} from "../../store/chat";

import AuthContext from "../../context/auth";

import  './Chat.css';
import {HelperActions} from "../../store/helper";

const Chat = () => {
    const showOverlay = useSelector(state => state.overlay?.showOverlay);
    const selectedChatBox = useSelector(state => state.chat.selected);
    const authCtx = useContext(AuthContext);

    const dispatch = useDispatch();

    useEffect(()=>{
        initiateSocket(authCtx?.userId);
        return ()=>{
            dispatch(HelperActions.dropDownHandler(false));
            dispatch(ChatActions.clearSelectedChat());
            disconnectSocket(authCtx?.userId)
        }
    },[authCtx?.userId])

    const saveMessage = (data) => {
        dispatch(ChatActions.saveChatMessage(data));
    }

    useEffect(() => {
        getGroupMessage((err, {messageData}) => {
            saveMessage(messageData);
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