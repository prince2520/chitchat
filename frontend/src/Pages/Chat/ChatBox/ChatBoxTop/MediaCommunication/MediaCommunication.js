import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { callingType } from "../../../../../constants/constants";
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

  const handleCalling = (type) => {
    const privateUserData = privateData.users.filter(
      (res) => res._id !== user._id
    )[0];

    dispatch(
      VideoAudioCallActions.callingHandler({
        isCalling: true,
        isReceivingCall: false,
        callData: {
          userToCall: privateUserData._id,
          callingType: type,
          data: {
            user: privateUserData,
            signal: null,
          },
        },
      })
    );
    socketCtx.callUser(privateUserData._id, type);

    dispatch(OverlayActions.openVideoChatHandler());
  };

  return (
    <React.Fragment>
      <Icon
        onClick={() => handleCalling(callingType[0])}
        icon="tabler:video"
        className="cursor-btn"
        style={{ fontSize: "2.25rem" }}
      />
      <Icon
        icon="mi:call"
        onClick={() => handleCalling(callingType[1])}
        className="cursor-btn"
        style={{
          fontSize: "2.25rem",
        }}
      />
    </React.Fragment>
  );
};

export default MediaCommunication;
