import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import React, { useContext, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { blockUser, removeUser, unBlockUser } from "../../../../api/group";
import { categoryState } from "../../../../constants/constants";

import Button from "../../../Button/Button";
import AuthContext from "../../../../context/authContext";
import ImageContainer from "../../../ImageContainer/ImageContainer";
import { uid } from "uid";

import { editGroup } from "../../../../api/group";
import { UserActions } from "../../../../store/userSlice";
import { socketRemoveUserGroup, socketUnblockUser, socketUpdatedGroup, socketBlockUser } from "../../../../socket";

import CustomInput from "../../../CustomInput/CustomInput";
import { saveInFirebase } from "../../../../utils/SaveInFirebase";

import "./GroupSettings.css";

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
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleRemoveUser = (removeUserId) => {
    const groupId = data._id;
    const token = authCtx.token;

    let removeData = {
      groupId,
      token
    };

    if (!isBlockList) {
      removeData['removeUserId'] = removeUserId;
      removeUser(removeData)
        .then((res) => {
          if (res.success) {
            dispatch(UserActions.removeUserGroup(removeData));
            socketRemoveUserGroup(removeData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      removeData['blockUserId'] = removeUserId;
      unBlockUser(removeData)
        .then((res) => {
          if (res.success) {
            socketUnblockUser(removeData);
            dispatch(UserActions.unblockUserGroup(removeData));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const isAdmin = () => {
    return authCtx.userId === data.createdBy;
  };

  const addUserToBlocklist = (blockedUser) => {
    const groupId = data._id;
    const token = authCtx.token;

    let blockData = {
      groupId,
      token,
      blockUserId: blockedUser._id,
    };

    blockUser(blockData)
      .then((res) => {
        if (res.success) {
          blockData["blockedUser"] = blockedUser;
          socketBlockUser(blockData);
          dispatch(UserActions.blockUserGroup(blockData));
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

const settingsLinks = ["Members", "Block List", "Edit", "Share"];

const GroupSettings = () => {
  const user = useSelector((state) => state.user);
  const link = useSelector((state) => state.overlay.showSettings.link);
  const [selectedLinks, setSelectedLinks] = useState(link);

  const [highResUrl, setHighResUrl] = useState(null);
  const [lowResUrl, setLowResUrl] = useState(null);
  const dispatch = useDispatch();

  const authCtx = useContext(AuthContext);

  const data = (
    user?.selectedType !== null && user?.selectedType === categoryState[0]
      ? user.groups
      : user.privates
  ).filter((res) => res._id === user.selectedId)[0];

  const displaySettingOption = () => {
    let displayData;

    const memberAndBlockCondition =
      settingsLinks[0] === selectedLinks || settingsLinks[1] === selectedLinks;
    const editCondition = settingsLinks[2] === selectedLinks;

    if (memberAndBlockCondition) {
      displayData = (
        <MembersAndBlockList
          data={data}
          isBlockList={selectedLinks === settingsLinks[1]}
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
    const name = event.target[1].value;
    const status = event.target[2].value;
    const token = authCtx.token;

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

    editGroup(saveData)
      .then((result) => {
        if (result.success) {
          dispatch(UserActions.editGroup(saveData));
          delete saveData.token;
          socketUpdatedGroup(saveData);
        }
      })
      .catch((err) => console.log(err));
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
          isEditable={selectedLinks === settingsLinks[2]}
          editImageHandler={(newHighResUrl, newLowResUrl) => {
            setHighResUrl(newHighResUrl);
            setLowResUrl(newLowResUrl);
          }}
        />
        <h5>{data.name}</h5>
      </div>
      <div className="flex-center group-settings-links">
        {settingsLinks.map((name) => (
          <p
            style={{ color: selectedLinks === name ? "var(--text)" : "" }}
            key={uid(32)}
            className="cursor-btn"
            onClick={() => setSelectedLinks(name)}
          >
            {name}
          </p>
        ))}
      </div>
      <div className="flex-center border group-settings-content">
        {displaySettingOption()}
      </div>
      {!(selectedLinks === settingsLinks[2]) ? (
        <Button backgroundColor={"var(--error)"} width={"50%"}>
          <p className="color-text">Delete</p>
        </Button>
      ) : (
        <Button backgroundColor={"var(--success)"} width={"50%"}>
          <p className="color-text">Save</p>
        </Button>
      )}
    </form>
  );
};

export default GroupSettings;
