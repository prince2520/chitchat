import './SearchResult.css';
import {Icon} from "@iconify/react";
import ImageContainer from "../../ImageContainer/ImageContainer";
import {addUserInPrivateChat} from "../../../api";
import {useContext} from "react";
import AuthContext from "../../../Context/auth";
const SearchResult = ({searchResult, setShowResult}) => {
    const authCtx = useContext(AuthContext);
    const addPrivateUserHandler = () => {
        addUserInPrivateChat(authCtx, authCtx?.userId, searchResult?._id)
            .then(res=>console.log(res))
            .catch(err=>console.log(err));
    }

    return (
        <div className={'search-result-container border box-shadow'}>
            <div className={'close-btn'}>
                <Icon
                    onClick={()=>setShowResult(false)}
                    icon="iconamoon:close-fill" />
            </div>
            <div className={'search-image-container'}>
                <ImageContainer src={searchResult.profileImageUrl}/>
            </div>
            <div className={'search-result-description'}>
                <span className={'username'}>{searchResult.userName}</span>
                <span className={'status'}>{searchResult?.Status}</span>
            </div>
            <div className={'search-result-join-btn'}>
                <Icon
                    onClick={()=>addPrivateUserHandler()}
                    style={{fontSize:"2.25rem", cursor:'pointer'}}
                    icon="subway:add" />
            </div>
        </div>

    );
};

export default SearchResult;