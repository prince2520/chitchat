import { useContext } from "react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { useDetectClickOutside } from "react-detect-click-outside";

import { UserActions } from "../../../store/user";
import { addUserInPrivate } from "../../../api/api";

import { socketAddPrivate } from "../../../socket";

import AuthContext from "../../../context/authContext";
import ImageContainer from "../../ImageContainer/ImageContainer";

import "./SearchResult.css";

const SearchResult = ({ data, setShowResult, setData }) => {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch()

  const addPrivateUserHandler = () => {
    addUserInPrivate(authCtx.token, authCtx.userId, data.user._id)
    .then((Private)=>{
      if(Private.success){
        dispatch(UserActions.addPrivate(Private.data))
        socketAddPrivate({
          userId : authCtx.userId,
          private : Private.data
        });
      }
    });
  };

  const closeSearchHandler = () => {
    setShowResult(false);
    setData(null);
  };

  const ref = useDetectClickOutside({ onTriggered: closeSearchHandler });

  return (
    <div ref={ref} className={"search-result-container border box-shadow"}>
      <div className={"close-btn"}>
        <Icon
          onClick={() => setShowResult(false)}
          icon="iconamoon:close-fill"
        />
      </div>
      <div className={"search-image-container"}>
        <ImageContainer src={data.user.profileImageUrl} />
      </div>
      <div className={"flex-center search-result-description"}>
        <h5 className="color-text">{data.user.name}</h5>
        <p className="color-text-light">{data.user?.status}</p>
      </div>
      <div className={"flex-center search-result-join-btn"}>
        <Icon
          onClick={() => addPrivateUserHandler()}
          style={{ fontSize: "2.25rem", cursor: "pointer" }}
          icon="subway:add"
        />
      </div>
    </div>
  );
};

export default SearchResult;
