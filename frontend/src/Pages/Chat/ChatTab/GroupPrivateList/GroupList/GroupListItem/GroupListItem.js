import { useDispatch, useSelector } from "react-redux";

import ImageContainer from "../../../../../../components/ImageContainer/ImageContainer";

import { UserActions } from "../../../../../../store/user";
import { categoryState } from "../../../../../../common";
import { getFormatDate } from "../../../../common_function";
import { useContext } from "react";
import AuthContext from "../../../../../../context/authContext";
import { Icon } from "@iconify/react";

const GroupListItem = ({ result }) => {
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const user = useSelector((state) => state.user);

  let msgLength = result.messages.length;
  let lastMsg = result.messages[msgLength-1];

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

   

  const checkTypeAndShowMsg = () => {
    console.log('type',lastMsg.type)
    let msg = "";
    switch (lastMsg.type) {
      case 'string':
        msg = <p>{lastMsg.message}</p>;
        break;
      case 'image':
        msg = (<p className="flex-center"><Icon icon="typcn:image"/> Photo</p>);
        break;
      case 'audio':
        msg = (<><span><Icon icon="typcn:image"/></span> Photo</>);
        break;        
      case 'video':
        msg = (<><span><Icon icon="akar-icons:video"/></span>Video</>)
        break; 
      default :
        msg = (<><span><Icon icon="ic:baseline-audio-file"/> </span>Other</>)
    };

    return msg;
  }

  const showLastMsg =  (
    <>
      {
        (msgLength > 0) ?
        <>
         <p className="flex-center">{lastMsg.user._id === authCtx.userId ? 'You' :  lastMsg.user.name } :</p> 
         {checkTypeAndShowMsg()}
        </>
         :
           <p>No message</p>
      }
    </>
  );

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
        <div className="flex-center">
          {showLastMsg}
        </div>
      </div>
    </div>
  );
};

export default GroupListItem;
