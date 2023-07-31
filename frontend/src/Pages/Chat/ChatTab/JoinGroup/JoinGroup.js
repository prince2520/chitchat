import {useContext} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import ImageContainer from "../../../../Helper/ImageContainer/ImageContainer";
import Button from "../../../../Helper/Button/Button";
import CustomInput from "../../../../Helper/CustomInput/CustomInput";

import {joinGroupHandler} from "../../../../api/api";
import {UserActions} from "../../../../store/user";

import AuthContext from "../../../../Context/auth";

const JoinGroup = () => {
    const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();

        let group_name = event.target[0].value;

        joinGroupHandler(authCtx?.token, group_name, authCtx?.userId)
            .then(res=>{
                if(res.success){
                    dispatch(UserActions.addGroupHandler(res.groupData));
                    navigate('/chat');
                }
            })
            .catch(err=>console.log(err));
    }

    return (
        <form onSubmit={(event)=>submitHandler(event)} className='create-group-container'>
            <div className='heading'>
                Join a Group
            </div>
            <div className={'image-edit-container'}>
                <ImageContainer src={'https://i.imgur.com/W5U9qZB.png'}/>
            </div>
            <CustomInput label={'Name'} icon={'material-symbols:edit'}/>
            <div className='create-group-btn'>
                <Button title={'Join'}/>
            </div>
        </form>
    );
};
export default JoinGroup;