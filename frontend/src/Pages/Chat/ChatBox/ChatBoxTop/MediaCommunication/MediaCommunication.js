import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { OverlayActions } from "../../../../../store/overlaySlice";
import { VideoAudioCallActions } from "../../../../../store/videoAudioCallSlice";

import SocketContext from "../../../../../context/socketContext";


const MediaCommunication = () => {
  const socketCtx = useContext(SocketContext);
  const user = useSelector((state) => state.user);

  const privateData = user.privates.filter(
    (res) => res._id === user.selectedId
  )[0];

  const dispatch = useDispatch();

  const handleCalling = () => {
    const privateUserData = privateData.users.filter(
      (res) => res._id !== user._id
    )[0];

    dispatch(
      VideoAudioCallActions.callingHandler({
        isCalling: true,
        isReceivingCall: false,
        callData: {
          userToCall: privateUserData._id,
          data: {
            user: privateUserData,
            signal: null,
          },
        },
      })
    );
    socketCtx.callUser(privateUserData._id);

    dispatch(OverlayActions.openVideoChatHandler());
  };

  return (
    <React.Fragment>
      <Icon
        onClick={() => handleCalling()}
        icon="tabler:video"
        className="cursor-btn"
        style={{ fontSize: "2.25rem" }}
      />
      <Icon
        icon="mi:call"
        className="cursor-btn"
        style={{
          fontSize: "2.25rem",
        }}
      />
    </React.Fragment>
  );
};

export default MediaCommunication;
