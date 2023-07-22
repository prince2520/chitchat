import ImageContainer from "../../../../../../Helper/ImageContainer/ImageContainer";
import {useDispatch, useSelector} from "react-redux";
import {ChatActions} from "../../../../../../store/chat";
import {categoryState} from "../../../../../../common";


const PrivateListItem = ({result}) => {
    const dispatch =useDispatch();
    const userId = useSelector(state => state.chat._id);

    const selectedPrivateUser = () => {
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
                <div className='group-name'>
                    {result.userName}
                </div>
                <div className='group-created'>
                    {result.Status}
                </div>
            </div>
        </div>
    );
};

export default PrivateListItem;