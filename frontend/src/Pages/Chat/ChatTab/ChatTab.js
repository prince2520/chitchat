import React from "react";

import { Outlet } from "react-router-dom";

import MyProfile from "./MyProfile/MyProfile";
import SearchBar from "./SearchBar/SearchBar";

import "./ChatTab.css";

const ChatTab = () => {
  return (
    <div className="chat-tab">
      <MyProfile />
      <SearchBar />
      <Outlet />
    </div>
  );
};

export default ChatTab;
