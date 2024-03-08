import { useSelector } from "react-redux";

import { categoryState } from "../../../../constants/constants"
import ImageContainer from "../../../ImageContainer/ImageContainer";
import { Icon } from "@iconify/react";

import Button from "../../../Button/Button";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

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

const MembersAndBlockList = ({ data, isBlockList = false }) => {
  return (
    <React.Fragment>
      {(isBlockList ? data.blockList : data.users).length > 0 ? (
        (isBlockList ? data.blockList : data.users).map((user) => {
          return (
            <div className="flex-center group-settings-user">
              <div className="flex-center group-settings-user-content">
                <ImageContainer
                  src={user.profileImageUrl}
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
                  <Icon
                    icon="pajamas:remove"
                    className="color-text-light"
                    fontSize={"1.25rem"}
                  />
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

const settingsLinks = ["Members", "Block List", "Share"];

const GroupSettings = () => {
  const user = useSelector((state) => state.user);
  const link = useSelector((state) => state.overlay.showSettings.link)
  const [selectedLinks, setSelectedLinks] = useState(link);

  const data = (
    user?.selectedType !== null && user?.selectedType === categoryState[0]
      ? user.groups
      : user.privates
  ).filter((res) => res._id === user.selectedId)[0];

  return (
    <div className="flex-center border box-shadow group-settings">
      <div className="flex-center group-settings-details">
        <ImageContainer src={data.groupImageUrl} width="6rem" height="6rem" />
        <h5>{data.name}</h5>
      </div>
      <div className="flex-center group-settings-links">
        {settingsLinks.map((name) => (
          <p className="cursor-btn" onClick={() => setSelectedLinks(name)}>
            {name}
          </p>
        ))}
      </div>
      <div className="flex-center border hoverState group-settings-content">
        {selectedLinks !== settingsLinks[2] ? (
          <MembersAndBlockList
            data={data}
            isBlockList={selectedLinks === settingsLinks[1]}
          />
        ) : (
          <Share groupId={data._id} />
        )}
      </div>
      <Button backgroundColor={"var(--error)"} width={"50%"}>
        <p className="color-text">Delete</p>
      </Button>
    </div>
  );
};

export default GroupSettings;
