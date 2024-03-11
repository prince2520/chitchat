import { useContext, useState } from "react";

import ImageContainer from "../../../../components/ImageContainer/ImageContainer";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import ChangeCategory from "../../../../components/ChangeCategory/ChangeCategory";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../../../store/userSlice";
import AuthContext from "../../../../context/authContext";
import { categoryState } from "../../../../constants/constants"
import { getLastMessage } from "../../../../utils/GetLastMessage";
import NoGroupPrivate from "./NoGroupPrivate/NoGroupPrivate";

import "./GroupPrivateList.css";

const GroupPrivateList = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const privates = user.privates;
  const authCtx = useContext(AuthContext);
  const groups = user.groups;

  console.log('GroupList', user)

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
      <SearchBar />
      <div className="group-private-list">
        {(isPrivate ? privates : groups).length > 0 ? (isPrivate ? privates : groups).map((data) => (
          <div
            key={data._id}
            className={`group-private-item ${
              data._id === user.selectedId && "group-selected"
            }  border`}
            onClick={() => selectedItem(data)}
          >
            <div className="group-private-item-left">
              <ImageContainer
                highResUrl={
                  isPrivate
                    ? data.users.filter((user) => user._id !== authCtx.userId)[0].highResUrl
                    : data.highResUrl
                }
                lowResUrl={
                  isPrivate
                  ? data.users.filter((user) => user._id !== authCtx.userId)[0].lowResUrl
                  : data.lowResUrl
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
        )): <NoGroupPrivate isPrivate={isPrivate}/>}
      </div>
    </>
  );
};

export default GroupPrivateList;
