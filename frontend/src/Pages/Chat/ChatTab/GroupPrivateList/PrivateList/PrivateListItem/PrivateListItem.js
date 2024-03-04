import { useDispatch, useSelector } from "react-redux";

import ImageContainer from "../../../../../../components/ImageContainer/ImageContainer";

import { UserActions } from "../../../../../../store/user";
import { useContext } from "react";
import { categoryState } from "../../../../../../common";

import AuthContext from "../../../../../../context/authContext";

import { checkTypeAndShowMsg } from "../../../../common_function";

const PrivateListItem = ({ data }) => {
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const user = useSelector((state) => state.user);

  let msgLength = data?.messages.length;
  let lastMsg = data?.messages[msgLength - 1];

  const chat = data.users.filter((user) => user._id !== authCtx.userId)[0];

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

  const selectedPrivateUser = () => {
    if (data._id === user.selectedId) {
      return;
    }

    dispatch(
      UserActions.selectedChat({
        isSelected: true,
        selectedId: data._id,
        selectedType: categoryState[1],
      })
    );
  };

  return (
    <div
      className={`group-private-item ${
        data._id === user.selectedId && "group-selected"
      }  border`}
      onClick={() => selectedPrivateUser()}
    >
      <div className="group-private-item-left">
        <ImageContainer src={data.profileImageUrl} />
      </div>
      <div className="group-private-item-right">
        <h5>{chat.name}</h5>
        {showLastMsg}
      </div>
    </div>
  );
};

export default PrivateListItem;
