import ChangeCategory from "../../../../Helper/ChangeCategory/ChangeCategory";
import SearchBar from "../../../../Helper/SearchBar/SearchBar";

import './GroupPrivateList.css';
import {useState} from "react";
import PrivateList from "./PrivateList/PrivateList";
import GroupList from "./GroupList/GroupList";

const GroupPrivateList = () => {
    const [privateChatSelected, setPrivateChatSelected] = useState(false);

    return (
        <>
            <ChangeCategory setPrivateChatSelected={setPrivateChatSelected}/>
            <SearchBar/>
            {privateChatSelected ?
                <PrivateList/> :
                <GroupList/>}
        </>
    );
};

export default GroupPrivateList;