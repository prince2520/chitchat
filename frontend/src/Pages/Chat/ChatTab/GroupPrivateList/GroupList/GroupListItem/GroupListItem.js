import { useDispatch, useSelector } from "react-redux";

import ImageContainer from "../../../../../../components/ImageContainer/ImageContainer";

import { UserActions } from "../../../../../../store/user";
import { categoryState } from "../../../../../../common";
import { getFormatDate } from "../../../../common_function";

const GroupListItem = ({ result }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const selectedGroup = () => {
    if (user.selectedId === result._id) {
      return;
    }

    let data = {
      selectedType: categoryState[0],
      selectedId: result._id,
    };

    if (result) {
      dispatch(UserActions.selectedChat(data));
    }
  };

  return (
    <div
      className={`group-private-item ${
        result._id === user.selectedId && "group-selected"
      } border`}
      onClick={() => {
        selectedGroup();
      }}
    >
      <div className="group-private-item-left">
        <ImageContainer src={result.groupImageUrl} />
      </div>
      <div className="group-private-item-right">
        <h5>{result.name}</h5>
        <p>
          Created At - {getFormatDate(result.createdAt).slice(5)}
        </p>
      </div>
    </div>
  );
};

export default GroupListItem;
