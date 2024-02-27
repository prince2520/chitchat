import React from "react";

import { useSelector } from "react-redux";

import VideoChat from "../../VideoChat/VideoChat";
import DragAndDrop from "../../DragAndDrop/DragAndDrop";
import ChatTab from "../../../Pages/Chat/ChatTab/ChatTab";

import "./Model.css";

const Model = () => {
  const overlay = useSelector((state) => state.overlay);
  return (
    <div
      className="model"
      style={{ width: overlay.showSideMobileBar ? "80%" : "100%" }}
    >
      {overlay.showSideMobileBar && (
        <div className={"model-chat-tab"}>
          <ChatTab />
        </div>
      )}
      {overlay.showDragDrop && <DragAndDrop />}
      {overlay.showVideoChat && <VideoChat />}
    </div>
  );
};

export default Model;
