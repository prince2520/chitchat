import { toast } from "react-toastify";
import { useCallback, useContext, useState } from "react";

import { fetchUser } from "../../../../api/user";

import SearchResult from "./SearchResult/SearchResult";
import AuthContext from "../../../../context/authContext";
import CustomInput from "../../../../components/CustomInput/CustomInput";

const SearchBar = () => {
  const authCtx = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // fetch search user data
  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    fetchUser(event.target[0].value, authCtx?.token)
      .then((result) => {
        console.log(result);
        if (result?.success) {
          setData(result?.user);
          setShowResult(result?.success);
          toast.success(result?.message);
        } else {
          toast.error(result?.message);
        }
      })
      .catch((err) => {
        toast.success(err);
      });
  }, []);

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      style={{ position: "relative" }}
      className="flex-center search-bar__container"
    >
      <CustomInput
        showLabel={false}
        icon={"material-symbols:search"}
        placeholder={"Search by email ..."}
      />
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
