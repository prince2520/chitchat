import {useSelector} from "react-redux";

import GroupListItem from "./GroupListItem/GroupListItem";

import '../GroupPrivateList.css'

const GroupList = () => {
    const groupList = useSelector(state => state.user.groupList);

    return (
        <div className="group-private-list">
            {groupList.map((result, idx) =>
                <GroupListItem
                    key={idx}
                    result={result}/>)}
        </div>
    );
};

export default GroupList;