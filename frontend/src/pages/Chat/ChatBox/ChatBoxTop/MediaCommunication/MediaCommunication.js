import { uid } from "uid";
import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { callingType } from "../../../../../constants/constants";
import { OverlayActions } from "../../../../../redux/slice/overlaySlice";
import { VideoAudioCallActions } from "../../../../../redux/slice/videoAudioCallSlice";

import SocketContext from "../../../../../context/socketContext";

const MediaCommunication = ({closeSettingHandler}) => {
  const socketCtx = useContext(SocketContext);
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);

  const privateData = chat.privates.filter(
    (res) => res._id === chat.selectedId
  )[0];

  const dispatch = useDispatch();

  const handleCalling = (type) => {
    closeSettingHandler();
    const privateUserData = privateData.users.filter(
      (res) => res._id !== user._id
    )[0];

    dispatch(
      VideoAudioCallActions.callingReducer({
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

    dispatch(OverlayActions.openVideoChatReducer());
  };

  return (
    <React.Fragment>
      <div
        key={uid(32)}
        className={"cursor-btn flex-center chat-settings__option"}
        onClick={() => {
          setTimeout(() => handleCalling(callingType[0]), [50]);
        }}
      >
        <Icon className="color-text-light" icon="tabler:video" />
        <h5 className="color-text-light">Video Call</h5>
      </div>
      <div
        key={uid(32)}
        className={"cursor-btn flex-center chat-settings__option"}
        onClick={() => {
          setTimeout(() => handleCalling(callingType[1]), [50]);
        }}
      >
        <Icon className="color-text-light" icon="mi:call" />
        <h5 className="color-text-light">Audio Call</h5>
      </div>
    </React.Fragment>
  );
};

export default MediaCommunication;
