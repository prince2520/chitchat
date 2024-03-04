import { Icon } from "@iconify/react";
import { useContext, useRef, useState } from "react";

import SearchResult from "./SearchResult/SearchResult";

import { fetchUser } from "../../api/api";

import AuthContext from "../../context/authContext";

import "./SearchBar.css";

const SearchBar = () => {
  const searchUserRef = useRef();
  const authCtx = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    fetchUser(searchUserRef.current?.value, authCtx?.token)
      .then((result) => {
        setData(result);
        setShowResult(result.success);
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
        <Icon icon="material-symbols:search" style={{ fontSize: "1.5rem" }} />
      </button>
      {showResult && (
        <SearchResult
          data={data}
          setShowResult={setShowResult}
          setData={setData}
        />
      )}
    </form>
  );
};

export default SearchBar;
