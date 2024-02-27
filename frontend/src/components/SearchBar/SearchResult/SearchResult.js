import { useContext } from "react";
import { Icon } from "@iconify/react";

import { useDetectClickOutside } from "react-detect-click-outside";

import ImageContainer from "../../ImageContainer/ImageContainer";
import { addUserInPrivateChat } from "../../../api/api";

import AuthContext from "../../../context/authContext";

import "./SearchResult.css";

const SearchResult = ({ searchResult, setShowResult }) => {
  const authCtx = useContext(AuthContext);
  const addPrivateUserHandler = () => {
    addUserInPrivateChat(authCtx, authCtx?.userId, searchResult?._id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const closeSearchHandler = () => {
    setShowResult(false);
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
        <ImageContainer src={searchResult.profileImageUrl} />
      </div>
      <div className={"flex-center search-result-description"}>
        <h5 className="color-text">{searchResult.userName}</h5>
        <p className="color-text-light">{searchResult?.Status}</p>
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
