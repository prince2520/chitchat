import React, {useContext, useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";

import NoMessage from "./NoMessage/NoMessage";
import ChatBoxTop from "./ChatBoxTop/ChatBoxTop";
import ChatBoxBottom from "./ChatBoxBottom/ChatBoxBottom";
import ChatBoxMiddle from "./ChatBoxMiddle/ChatBoxMiddle";

import {categoryState} from "../../../common";
import {ChatActions} from "../../../store/chat";
import {fetchGroupMessages, fetchPrivateMessage} from "../../../api/api";

import AuthContext from "../../../Context/auth";

import './ChatBox.css';

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