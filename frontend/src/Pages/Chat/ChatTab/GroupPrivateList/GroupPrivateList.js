import {useState} from "react";

import GroupList from "./GroupList/GroupList";
import PrivateList from "./PrivateList/PrivateList";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import ChangeCategory from "../../../../components/ChangeCategory/ChangeCategory";

import './GroupPrivateList.css';

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