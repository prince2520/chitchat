import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";

import SearchResult from "./SearchResult/SearchResult";
import CustomInput from "../../../../components/CustomInput/CustomInput";

import { fetchUserAPI } from "../../../../api/userAPI";

const SearchBar = () => {

  const [data, setData] = useState(null);
  const user = useSelector(state=>state.user);
  const [showResult, setShowResult] = useState(false);

  // fetch search user data
  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    fetchUserAPI(event.target[0].value, user.token)
      .then((result) => {
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
  }, [user.token]);

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
