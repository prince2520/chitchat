import { useDispatch, useSelector } from "react-redux";

import ImageContainer from "../../../../../../components/ImageContainer/ImageContainer";

import { UserActions } from "../../../../../../store/user";
import { categoryState } from "../../../../../../common";
import { useContext } from "react";
import { checkTypeAndShowMsg } from "../../../../common_function";

import AuthContext from "../../../../../../context/authContext";

const GroupListItem = ({ result }) => {
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const user = useSelector((state) => state.user);

  let msgLength = result?.messages.length;
  let lastMsg = result?.messages[msgLength-1];

  const selectedGroup = () => {
    if (user.selectedId === result?._id) {
      return;
    }

    let data = {
      isSelected : true,
      selectedType: categoryState[0],
      selectedId: result?._id,
    };

    if (result) {
      dispatch(UserActions.selectedChat(data));
    }
  };

   
  const showLastMsg =  (
    <>
      {
        (msgLength > 0) ?
        <>
         <p className="flex-center">{lastMsg.user._id === authCtx.userId ? 'You' :  lastMsg.user.name } :</p> 
         {checkTypeAndShowMsg(lastMsg)}
        </>
         :
           <p>No message</p>
      }
    </>
  );

  return (
    <div
      className={`group-private-item ${
        result?._id === user.selectedId && "group-selected"
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
        <div className="flex-center">
          {showLastMsg}
        </div>
      </div>
    </div>
  );
};

export default GroupListItem;
