import './SearchBar.css';
import {Icon} from "@iconify/react";
import {searchUserHandler} from "../../api";
import {useContext, useRef, useState} from "react";
import AuthContext from "../../Context/auth";
import SearchResult from "./SearchResult/SearchResult";
const SearchBar = () => {
    const authCtx = useContext(AuthContext);
    const searchUserRef = useRef();
    const [showResult, setShowResult] = useState(false);
    const [searchResult, setSearchResult] = useState({})

    const submitHandler = () => {
        searchUserHandler(authCtx?.token, searchUserRef.current?.value)
            .then(result=>{
                setShowResult(result.success);
                setSearchResult(result.user);
            })
            .catch(err=>console.log(err));
    };

    return(
        <div className="search-bar-container border">
            <input ref={searchUserRef} placeholder={'Search by email ...'}/>
            <Icon
                onClick={()=>submitHandler()}
                icon="material-symbols:search"
                style={{color:'var(--text)', fontSize:'2rem'}}/>
            {showResult && <SearchResult setShowResult={setShowResult} searchResult={searchResult}/>}
        </div>
    );
};

export default SearchBar;