import { Icon } from "@iconify/react";
import { useContext, useRef, useState } from "react";

import SearchResult from "./SearchResult/SearchResult";

import { searchUserHandler } from "../../api/api";

import AuthContext from "../../context/authContext";

import "./SearchBar.css";

const SearchBar = () => {
  const searchUserRef = useRef();
  const authCtx = useContext(AuthContext);
  const [showResult, setShowResult] = useState(false);
  const [searchResult, setSearchResult] = useState({});

  const submitHandler = (event) => {
    event.preventDefault();
    searchUserHandler(authCtx?.token, searchUserRef.current?.value)
      .then((result) => {
        setShowResult(result.success);
        setSearchResult(result.user);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      onClick={(event) => submitHandler(event)}
      className="flex-center search-bar-container"
    >
      <input ref={searchUserRef} placeholder={"Search by email ..."} />
      <button>
        <Icon
          icon="material-symbols:search"
          style={{fontSize: "1.5rem" }}
        />
      </button>
      {showResult && (
        <SearchResult
          setShowResult={setShowResult}
          searchResult={searchResult}
        />
      )}
    </form>
  );
};

export default SearchBar;
