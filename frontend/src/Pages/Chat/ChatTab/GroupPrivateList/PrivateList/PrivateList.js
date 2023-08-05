import {useSelector} from "react-redux";

import PrivateListItem from "./PrivateListItem/PrivateListItem";

const PrivateList = () => {
    const privateList = useSelector(state => state.user.privateList);

    return (
        <div className="group-private-list">
            {privateList.map((result, idx) => <PrivateListItem key={idx} result={result}/>)}
        </div>
    );
};

export default PrivateList;