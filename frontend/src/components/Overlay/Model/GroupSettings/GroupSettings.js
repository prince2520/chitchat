import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import React, { useContext, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { removeUser } from "../../../../api/group";
import { categoryState } from "../../../../constants/constants";

import Button from "../../../Button/Button";
import AuthContext from "../../../../context/authContext";
import ImageContainer from "../../../ImageContainer/ImageContainer";
import { uid } from "uid";

import { UserActions } from "../../../../store/userSlice";
import { socketRemoveUserGroup } from "../../../../socket";

import "./GroupSettings.css";
import CustomInput from "../../../CustomInput/CustomInput";

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

  const removeUserfromGroup = (removeUserId) => {
    const groupId = data._id;
    const token = authCtx.token;

    let removeData = {
      groupId,
      token,
      removeUserId,
    };

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
      blockedUser,
    };

    dispatch(UserActions.blockUserGroup(blockData));
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
                      <div className="flex-center" style={{justifyContent: "space-between", width : "4rem"}}>
                        <Icon
                          onClick={() => addUserToBlocklist(user)}
                          className="color-text-light cursor-btn"
                          fontSize={"1.25rem"}
                          icon="streamline:inbox-block-solid"
                        />
                        <Icon
                          onClick={() => removeUserfromGroup(user._id)}
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

  return (
    <div className="flex-center border box-shadow group-settings">
      <div className="flex-center group-settings-details">
        <ImageContainer
          highResUrl={data.highResUrl}
          lowResUrl={data.lowResUrl}
          width="6rem"
          height="6rem"
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
      <div className="flex-center border hoverState group-settings-content">
        {displaySettingOption()}
      </div>
      <Button backgroundColor={"var(--error)"} width={"50%"}>
        <p className="color-text">Delete</p>
      </Button>
    </div>
  );
};

export default GroupSettings;
