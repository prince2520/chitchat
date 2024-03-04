import { Outlet } from "react-router-dom";

import MyProfile from "./MyProfile/MyProfile";

import React from "react";

import "./ChatTab.css";

const ChatTab = () => {
  return (
    <div className="chat-tab">
      <MyProfile />
      <Outlet />
    </div>
  );
};

export default ChatTab;
