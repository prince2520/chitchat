import { uid } from "uid";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { categoryState } from "../../../../constants/constants";
import { saveInFirebase } from "../../../../utils/SaveInFirebase";
import { groupSettingsLinks } from "../../../../constants/constants";

import Button from "../../../Button/Button";
import CustomInput from "../../../CustomInput/CustomInput";
import ImageContainer from "../../../ImageContainer/ImageContainer";
import useLeaveDeleteGroup from "../../../../hooks/useLeaveDeleteGroup";

import "./GroupSettings.css";
import { blockUserGroupThunk, removeUserGroupThunk, unblockUserGroupThunk, updateGroupThunk } from "../../../../redux/thunk/chatThunk";
import { OverlayActions } from "../../../../redux/slice/overlaySlice";

const Share = ({ groupId }) => {
  return (
    <>
      <div className="flex-center cursor-btn group-share">
        <div className="flex-center">
          <p>Group Id: </p>
          <p>{groupId}</p>
        </div>
        <CopyToClipboard text={groupId}>
          <Icon
            icon="heroicons:paper-clip-16-solid"
            className="color-text-extra-light"
            fontSize={"1.5rem"}
          />
        </CopyToClipboard>
      </div>
    </>
  );
};

const Edit = ({ data }) => {
  return (
    <div
      className="flex-center"
      style={{ flexDirection: "column", rowGap: "1rem", width: "100%" }}
    >
      <CustomInput
        defaultValue={data.name}
        label={"Group Name "}
        type={"text"}
        width="100%"
      />
      <CustomInput
        defaultValue={data.status}
        label={"Description "}
        type={"text"}
        width="100%"
      />
    </div>
  );
};

const MembersAndBlockList = ({ data, isBlockList = false }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleRemoveUser = (removeUserId) => {
    const groupId = data._id;
    const token = user.token;

    let removeData = {
      groupId,
      token,
      chatType: categoryState[0],
      chatId: groupId
    };

    if (!isBlockList) {
      removeData["removeUserId"] = removeUserId;
      dispatch(removeUserGroupThunk({ data: removeData }));
    } else {
      removeData["blockUserId"] = removeUserId;
      dispatch(unblockUserGroupThunk({ data: removeData }));
    }
  };

  const isAdmin = () => {
    return user._id === data.createdBy;
  };

  const addUserToBlocklist = (blockedUser) => {
    const groupId = data._id;
    const token = user.token;

    let blockData = {
      groupId,
      token,
      blockUserId: blockedUser._id,
      blockedUser: blockedUser
    };

    dispatch(blockUserGroupThunk({ data: blockData }));
  };

  return (
    <React.Fragment>
      {(isBlockList ? data.blockList : data.users).length > 0 ? (
        (isBlockList ? data.blockList : data.users).map((user) => {
          return (
            <div key={uid()} className="flex-center group-settings-user">
              <div className="flex-center group-settings-user-content">
                <ImageContainer
                  highResUrl={user.highResUrl}
                  lowResUrl={user.lowResUrl}
                  width="2rem"
                  height="2rem"
                />
                <p className={"color-text-light"}>{user.name}</p>
              </div>
              <div className="flex-center group-settings-user-content">
                {data.createdBy === user._id ? (
                  <Button
                    width={"fit-content"}
                    backgroundColor={"var(--success)"}
                  >
                    <h6>Admin</h6>
                  </Button>
                ) : (
                  <>
                    {isAdmin() ? (
                      <div
                        className="flex-center"
                        style={{
                          justifyContent: "space-between",
                          width: "4rem",
                        }}
                      >
                        {!isBlockList && (
                          <Icon
                            onClick={() => addUserToBlocklist(user)}
                            className="color-text-light cursor-btn"
                            fontSize={"1.25rem"}
                            icon="streamline:inbox-block-solid"
                          />
                        )}
                        <Icon
                          onClick={() => handleRemoveUser(user._id)}
                          icon="pajamas:remove"
                          className="color-text-light cursor-btn"
                          fontSize={"1.25rem"}
                        />
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p>No User!</p>
      )}
    </React.Fragment>
  );
};


const GroupSettings = () => {
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const link = useSelector((state) => state.overlay.showSettings.link);
  const [selectedLinks, setSelectedLinks] = useState(link);

  const [highResUrl, setHighResUrl] = useState(null);
  const [lowResUrl, setLowResUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();


  const data = (
    chat.selectedType !== null && chat.selectedType === categoryState[0]
      ? chat.groups
      : chat.privates
  ).filter((res) => res._id === chat.selectedId)[0];

  const { handleDeleteChat, leaveDeleteloading } = useLeaveDeleteGroup();

  const displaySettingOption = () => {
    let displayData;

    const memberAndBlockCondition =
      groupSettingsLinks[0] === selectedLinks || groupSettingsLinks[1] === selectedLinks;
    const editCondition = groupSettingsLinks[2] === selectedLinks;

    if (memberAndBlockCondition) {
      displayData = (
        <MembersAndBlockList
          data={data}
          isBlockList={selectedLinks === groupSettingsLinks[1]}
        />
      );
    } else if (editCondition) {
      displayData = <Edit data={data} />;
    } else {
      displayData = <Share groupId={data._id} />;
    }

    return displayData;
  };

  const saveEditData = async (event) => {
    event.preventDefault();

    const name = event?.target[1]?.value;
    const status = event?.target[2]?.value;
    const token = user.token;

    if (!name || !status) return;

    const firebaseHighResUrl = await saveInFirebase(
      highResUrl,
      `groups/${data._id}/groupImg/highResImg-${data._id}`
    );
    const firebaseLowResUrl = await saveInFirebase(
      lowResUrl,
      `groups/${data._id}/groupImg/lowResImg-${data._id}`
    );

    let saveData = {
      token,
      groupId: data._id,
      name,
      status,
      highResUrl: firebaseHighResUrl,
      lowResUrl: firebaseLowResUrl,
    };

    setLoading(true);

    dispatch(updateGroupThunk({ data: saveData }))
      .unwrap()
      .finally(() => setLoading(true));
  };

  return (
    <form
      onSubmit={(event) => saveEditData(event)}
      className="flex-center border box-shadow group-settings"
    >
      <div className="flex-center group-settings-details">
        <ImageContainer
          highResUrl={data.highResUrl}
          lowResUrl={data.lowResUrl}
          width="6rem"
          height="6rem"
          isEditable={selectedLinks === groupSettingsLinks[2]}
          editImageHandler={(newHighResUrl, newLowResUrl) => {
            setHighResUrl(newHighResUrl);
            setLowResUrl(newLowResUrl);
          }}
        />
        <h5>{data.name}</h5>
      </div>
      <div className="flex-center group-settings-links">
        {groupSettingsLinks.map((name) => {
          if (groupSettingsLinks[2] === name && user._id !== data.createdBy) {
            return;
          }

          return (
            <p
              style={{ color: selectedLinks === name ? "var(--text)" : "" }}
              key={uid(32)}
              className="cursor-btn"
              onClick={() => setSelectedLinks(name)}
            >
              {name}
            </p>
          );
        })}
      </div>
      <div className="flex-center border group-settings-content">
        {displaySettingOption()}
      </div>
      {!(selectedLinks === groupSettingsLinks[2]) ? (
        <Button
          loading={leaveDeleteloading}
          type="click"
          onClick={() => {
            dispatch(OverlayActions.closeOverlayReducer());
            handleDeleteChat()
          }}
          backgroundColor={"var(--error)"}
          width={"50%"}
        >
          <h5 className="color-text">
            {user._id === data.createdBy ? "Delete" : "Leave"}
          </h5>
        </Button>
      ) : (
        <Button
          loading={loading}
          backgroundColor={"var(--success)"}
          width={"50%"}
        >
          <h5 className="color-text">Save</h5>
        </Button>
      )}
    </form>
  );
};

export default GroupSettings;
