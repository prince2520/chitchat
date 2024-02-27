import {Outlet} from "react-router-dom";

import MyProfile from "./MyProfile/MyProfile";

import './ChatTab.css';
import React from "react";

const ChatTab = () => {
    return (
        <div className="chat-tab">
            <MyProfile/>
            <Outlet/>
        </div>
    );
};

export default ChatTab;