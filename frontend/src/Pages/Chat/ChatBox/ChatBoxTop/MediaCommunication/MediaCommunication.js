import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import SocketContext from "../../../../../context/socketContext";
import {useSelector } from "react-redux";

const MediaCommunication = () => {
  const socketCtx = useContext(SocketContext);
  const userId = useSelector((state) => state.chat._id);

  return (
    <React.Fragment>
      <Icon
        onClick={() => {
          socketCtx.callUser(userId);
        }}
        icon="tabler:video"
        className="cursor-btn"
        style={{ color: "var(--text-light)", fontSize: "2.25rem" }}
      />
      <Icon
        icon="mi:call"
        className="cursor-btn"
        style={{
          color: "var(--text-light)",
          fontSize: "2.25rem",
        }}
      />
    </React.Fragment>
  );
};

export default MediaCommunication;
