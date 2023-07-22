import ChatBoxTop from "./ChatBoxTop/ChatBoxTop";
import ChatBoxBottom from "./ChatBoxBottom/ChatBoxBottom";

import React from "react";

import './ChatBox.css';
import NoMessage from "./NoMessage/NoMessage";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect} from "react";
import {ChatActions} from "../../../store/chat";
import ChatBoxMiddle from "./ChatBoxMiddle/ChatBoxMiddle";
import AuthContext from "../../../Context/auth";
import {fetchGroupMessages, fetchPrivateMessage} from "../../../api";
import {categoryState} from "../../../common";

const ChatBox = () => {
    const chat = useSelector(state => state.chat);
    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);


    useEffect(() => {
        if (chat?.type === categoryState[0]) {
            fetchGroupMessages(chat.name, authCtx?.token)
                .then((res) => {
                    if(res.success){
                        dispatch(ChatActions.saveFetchChatMessage(res.messages));
                    }
                })
                .catch(err => console.log(err));
        }else {
            fetchPrivateMessage(authCtx?.userId, chat._id, authCtx?.token)
                .then((res) => {
                    if(res.success){
                        dispatch(ChatActions.saveFetchChatMessage(res.messages));
                    }
                })
                .catch(err => console.log(err));
        }
    }, [chat._id])

    return (
        <div className="chat-box">
            <ChatBoxTop/>
            {(chat.messages.length !== 0) ? <ChatBoxMiddle/> : <NoMessage/>}
            <ChatBoxBottom/>
        </div>
    );
};
export default React.memo(ChatBox);