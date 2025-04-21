import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";

import { useDetectClickOutside } from "react-detect-click-outside";

import ImageContainer from "../../../../../components/ImageContainer/ImageContainer";

import { createPrivateThunk } from "../../../../../redux/thunk/chatThunk";

import "./SearchResult.css";

const SearchResult = ({ data, setShowResult, setData }) => {
  const dispatch = useDispatch();


  // close search result
  const handleCloseSearch = () => {
    setShowResult(false);
    setData(null);
  };

  const ref = useDetectClickOutside({ onTriggered: handleCloseSearch });

  return (
    <div ref={ref} className={"border box-shadow search-result__container"}>
      <div className={"flex-center search-result__image__container"}>
        <ImageContainer
          highResUrl={data.highResUrl}
          lowResUrl={data.lowResUrl}
          height="3.5rem"
          width="3.5rem"
        />
      </div>
      <div className={"flex-center search-result__description"}>
        <h5 className="color-text">{data.name}</h5>
        <h6 className="color-text-light">{data.status}</h6>
      </div>
      <div className={"flex-center search-result__join-btn"}>
        <Icon
          onClick={() => dispatch(createPrivateThunk({ chatId: data._id }))}
          style={{ fontSize: "1.75rem", cursor: "pointer" }}
          icon="subway:add"
        />
      </div>
    </div>
  );
};

export default SearchResult;
