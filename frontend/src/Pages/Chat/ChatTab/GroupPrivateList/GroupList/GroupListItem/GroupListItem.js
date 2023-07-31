import {useDispatch, useSelector} from "react-redux";

import ImageContainer from "../../../../../../Helper/ImageContainer/ImageContainer";

import {ChatActions} from "../../../../../../store/chat";
import {categoryState} from "../../../../../../common";

const GroupListItem = ({result}) => {
    const dispatch =useDispatch();
    const chat = useSelector(state => state.chat);

    const selectedGroup = () => {
        let data = {
            type: categoryState[0],
            _id: result._id,
            photo: result.groupImageUrl,
            name: result.groupName,
            users: result.user
        }
        if(result){
            dispatch(ChatActions.selectedChatBox(data));
        }
    };


    return (
        <div className={`group-private-item ${(result._id === chat._id) && 'group-selected'} border`} onClick={() => {selectedGroup()}}>
            <div className='group-private-item-left'>
                <ImageContainer src={result.groupImageUrl}/>
            </div>
            <div className='group-private-item-right'>
                <div className='group-name'>
                    {result.groupName}
                </div>
                <div className='group-created'>
                    Created At -  Aug, 2021
                </div>
            </div>
        </div>
    );
};

export default GroupListItem;