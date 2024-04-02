import { useContext } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { socketAddPrivate } from "../../../../../socket";
import { createPrivate } from "../../../../../api/private";
import { UserActions } from "../../../../../store/userSlice";
import { useDetectClickOutside } from "react-detect-click-outside";

import AuthContext from "../../../../../context/authContext";
import ImageContainer from "../../../../../components/ImageContainer/ImageContainer";

import "./SearchResult.css";

const SearchResult = ({ data, setShowResult, setData }) => {
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);

  // create private chat and save it to frontend
  const handleAddPrivate = () => {
    createPrivate(authCtx?.token, authCtx?.userId, data._id)
      .then((data) => {
        if (data.success) {
          dispatch(UserActions.addPrivate(data.data));
          socketAddPrivate({
            userId: authCtx.userId,
            private: data.data,
          });
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  // close search result
  const handleCloseSearch = () => {
    setShowResult(false);
    setData(null);
  };

  const ref = useDetectClickOutside({ onTriggered: handleCloseSearch });

  return (
    <div ref={ref} className={"border box-shadow search-result__container"}>
      <div className={"close-btn"}>
        <Icon
          onClick={() => setShowResult(false)}
          icon="iconamoon:close-fill"
          style={{ fontSize: "1.5rem" }}
        />
      </div>
      <div className={"search-result__image__container"}>
        <ImageContainer
          highResUrl={data.highResUrl}
          lowResUrl={data.lowResUrl}
        />
      </div>
      <div className={"flex-center search-result__description"}>
        <h5 className="color-text">{data.name}</h5>
        <p className="color-text-light">{data.status}</p>
      </div>
      <div className={"flex-center search-result__join-btn"}>
        <Icon
          onClick={() => handleAddPrivate()}
          style={{ fontSize: "1.75rem", cursor: "pointer" }}
          icon="subway:add"
        />
      </div>
    </div>
  );
};

export default SearchResult;
