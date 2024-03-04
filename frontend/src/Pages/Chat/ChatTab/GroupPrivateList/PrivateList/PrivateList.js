import { useSelector } from "react-redux";

import PrivateListItem from "./PrivateListItem/PrivateListItem";

const PrivateList = () => {
  const privates = useSelector((state) => state.user.privates);

  console.log("privates", privates);

  return (
    <div className="group-private-list">
      {privates.map((data, idx) => (
        <PrivateListItem key={idx} data={data} />
      ))}
    </div>
  );
};

export default PrivateList;
