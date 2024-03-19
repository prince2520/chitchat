import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import SocketContext from "../../../../../context/socketContext";
import {useSelector } from "react-redux";

const MediaCommunication = () => {
  const socketCtx = useContext(SocketContext);
  const user = useSelector(state => state.user);
  
  const privateData=  user.privates.filter((res) => res._id === user.selectedId)[0];

  return (
    <React.Fragment>
      <Icon
        onClick={() => {
          console.log("privateData",  privateData);
          const userId = privateData.users.filter(res=>res._id !== user._id)[0]._id;
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
