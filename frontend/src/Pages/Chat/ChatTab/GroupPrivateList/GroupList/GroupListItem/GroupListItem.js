import { useDispatch, useSelector } from "react-redux";

import ImageContainer from "../../../../../../components/ImageContainer/ImageContainer";

import { ChatActions } from "../../../../../../store/chat";
import { categoryState } from "../../../../../../common";
import { getFormatDate } from "../../../../common_function";

const GroupListItem = ({ result }) => {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);

  const selectedGroup = () => {
    if (chat._id === result._id) {
      return;
    }

    let data = {
      type: categoryState[0],
      _id: result._id,
      photo: result.groupImageUrl,
      name: result.groupName,
      users: result.user,
    };
    if (result) {
      dispatch(ChatActions.selectedChatBox(data));
    }
  };

  return (
    <div
      className={`group-private-item ${
        result._id === chat._id && "group-selected"
      } border`}
      onClick={() => {
        selectedGroup();
      }}
    >
      <div className="group-private-item-left">
        <ImageContainer src={result.groupImageUrl} />
      </div>
      <div className="group-private-item-right">
        <h5>{result.groupName}</h5>
        <p>
          Created At - {getFormatDate(result.createdAt).slice(5)}
        </p>
      </div>
    </div>
  );
};

export default GroupListItem;
