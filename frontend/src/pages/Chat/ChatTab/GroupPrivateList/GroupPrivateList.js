import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NoGroupPrivate from "./NoGroupPrivate/NoGroupPrivate";
import ImageContainer from "../../../../components/ImageContainer/ImageContainer";
import ChangeCategory from "../../../../components/ChangeCategory/ChangeCategory";

import { ChatActions } from "../../../../redux/slice/chatSlice";
import { categoryState } from "../../../../constants/constants";
import { getLastMessage } from "../../../../utils/GetLastMessage";

import "./GroupPrivateList.css";

const GroupPrivateList = () => {
  const [isPrivate, setIsPrivate] = useState(false);

  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
 

  const dispatch = useDispatch();

  const selectedItem = (item) => {
    if (chat.selectedId === item?._id) {
      return;
    }
    let data = {
      isSelected: true,
      selectedType: categoryState[!isPrivate ? 0 : 1],
      selectedId: item?._id,
    };

    if (item) {
      dispatch(ChatActions.selectedChat(data));
    }
  };

  const showLastMsg = (data) => {
    let msgLength = data?.messages?.length;
    let lastMsg = data?.messages[msgLength - 1];
    return (
      <>
        {msgLength > 0 ? (
          <>
            <p className="flex-center">
              {lastMsg.user._id === user._id ? "You" : lastMsg.user.name}{" "}
              : {getLastMessage(lastMsg)}
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
      <div className="group-private-list">
        {(isPrivate ? chat.privates : chat.groups)?.length > 0 ? (
          (isPrivate ? chat.privates : chat.groups).map((data) => (
            <div
              key={data._id}
              className={`group-private-list__item ${
                data._id === chat.selectedId && "group-selected"
              }  border`}
              onClick={() => selectedItem(data)}
            >
              <div className="group-private-list__item-left">
                <ImageContainer
                  highResUrl={
                    isPrivate
                      ? data.users.filter(
                          (u) => u._id !== user._id
                        )[0].highResUrl
                      : data.highResUrl
                  }
                  lowResUrl={
                    isPrivate
                      ? data.users.filter(
                          (u) => u._id !== user._id
                        )[0].lowResUrl
                      : data.lowResUrl
                  }
                  height="3.5rem"
                  width="3.5rem"
                />
              </div>
              <div className="group-private-list__item-right">
                <h5>
                  {isPrivate
                    ? data.users.filter(
                        (u) => u._id !== user._id
                      )[0].name
                    : data.name}
                </h5>
                {showLastMsg(data)}
              </div>
            </div>
          ))
        ) : (
          <NoGroupPrivate isPrivate={isPrivate} />
        )}
      </div>
    </>
  );
};

export default GroupPrivateList;
