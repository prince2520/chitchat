import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useCallback, useContext, useRef, useState } from "react";

import { fetchUser } from "../../api/user";

import AuthContext from "../../context/authContext";
import SearchResult from "./SearchResult/SearchResult";

import "./SearchBar.css";

const SearchBar = () => {
  const searchUserRef = useRef();
  const authCtx = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const submitHandler = useCallback((event) => {
    event.preventDefault();
    fetchUser(searchUserRef.current?.value, authCtx?.token)
      .then((result) => {
        if (result?.success) {
          console.log('result', result);
          setData(result?.user);
          setShowResult(result?.success);
        }else{
          toast.error(result?.message);
        }
      })
      .catch((err) => {
        toast.success(err);
      });
  },[]);

  return (
    <form
      onSubmit={(event) => submitHandler(event)}
      className="flex-center search-bar-container"
    >
      <input ref={searchUserRef} placeholder={"Search by email ..."} />
      <button>
        <Icon icon="material-symbols:search" style={{ fontSize: "1.5rem" }} />
      </button>
      {(showResult && data) && (
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
