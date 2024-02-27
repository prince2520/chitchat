import {useDispatch, useSelector} from "react-redux";

import ImageContainer from "../../../../../../components/ImageContainer/ImageContainer";

import {categoryState} from "../../../../../../common";
import {ChatActions} from "../../../../../../store/chat";

const PrivateListItem = ({result}) => {
    const dispatch =useDispatch();
    const userId = useSelector(state => state.chat._id);
    const chat = useSelector(state => state.chat);


    const selectedPrivateUser = () => {
        if(chat._id === result._id){
            return;
        }

        dispatch(ChatActions.selectedChatBox({
            type: categoryState[1],
            _id: result._id,
            photo: result.profileImageUrl,
            name: result.userName,
            status: result.Status
        }))
    };

    return (
        <div className={`group-private-item ${(result._id === userId) && 'group-selected'}  border`} onClick={()=>selectedPrivateUser()}>
            <div className='group-private-item-left'>
                <ImageContainer src={result.profileImageUrl}/>
            </div>
            <div className='group-private-item-right'>
                <h5>
                    {result.userName}
                </h5>
                <p>
                    {result.Status}
                </p>
            </div>
        </div>
    );
};

export default PrivateListItem;