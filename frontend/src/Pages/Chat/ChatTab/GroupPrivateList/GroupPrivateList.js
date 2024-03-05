import { useContext, useState } from "react";

import ImageContainer from "../../../../components/ImageContainer/ImageContainer";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import ChangeCategory from "../../../../components/ChangeCategory/ChangeCategory";

import { Icon } from "@iconify/react";

import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../../../store/user";
import AuthContext from "../../../../context/authContext";
import { categoryState } from "../../../../common";

import "./GroupPrivateList.css";

const GroupPrivateList = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const privates = user.privates;
  const authCtx = useContext(AuthContext);
  const groups = user.groups;

  const checkTypeAndShowMsg = (lastMsg) => {
    let msg = "";
    switch (lastMsg.type) {
      case "string":
        msg = <>{lastMsg.message}</>;
        break;
      case "image":
        msg = (
          <>
            <Icon icon="typcn:image" /> Photo
          </>
        );
        break;
      case "audio":
        msg = (
          <>
            <Icon icon="typcn:image" /> Photo
          </>
        );
        break;
      case "video":
        msg = (
          <>
            <Icon icon="akar-icons:video" /> Video
          </>
        );
        break;
      default:
        msg = (
          <>
            <Icon icon="ic:baseline-audio-file" /> Other
          </>
        );
    }

    return msg;
  };

  const selectedItem = (item) => {
    if (user.selectedId === item?._id) {
      return;
    }

    let data = {
      isSelected: true,
      selectedType: categoryState[!isPrivate ? 0 : 1],
      selectedId: item?._id,
    };

    if (item) {
      dispatch(UserActions.selectedChat(data));
    }
  };

  const showLastMsg = (data) => {
    let msgLength = data?.messages.length;
    let lastMsg = data?.messages[msgLength - 1];
    return (
      <>
        {msgLength > 0 ? (
          <>
            <p className="flex-center">
              {lastMsg.user._id === authCtx.userId ? "You" : lastMsg.user.name}{" "}
              : {checkTypeAndShowMsg(lastMsg)}
            </p>
          </>
        ) : (
          <p>No message</p>
        )}
      </>
    );
  };

  return (
    <>
      <ChangeCategory setIsPrivate={setIsPrivate} />
      <SearchBar />
      <div className="group-private-list">
        {(isPrivate ? privates : groups).map((data) => (
          <div
            key={data._id}
            className={`group-private-item ${
              data._id === user.selectedId && "group-selected"
            }  border`}
            onClick={() => selectedItem(data)}
          >
            <div className="group-private-item-left">
              <ImageContainer
                src={
                  isPrivate
                    ? data.users.filter((user) => user._id !== authCtx.userId)[0].profileImageUrl
                    : data.groupImageUrl
                }
              />
            </div>
            <div className="group-private-item-right">
              <h5>
                {isPrivate
                  ? data.users.filter((user) => user._id !== authCtx.userId)[0]
                      .name
                  : data.name}
              </h5>
              {showLastMsg(data)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GroupPrivateList;
