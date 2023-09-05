import {useContext} from "react";
import {Icon} from "@iconify/react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {HelperActions} from "../../store/helper";

import AuthContext from "../../context/auth";

import './Dropdown.css';

const Dropdown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext)

    const navigateHandler = (url) => {
        dispatch(HelperActions.dropDownHandler(false));
        navigate(url);
    };

    return (
        <div className={'menu-container box-shadow'}>
            <div className={'menu-close cursor-btn'}>
                <Icon onClick={() => dispatch(HelperActions.dropDownHandler(false))} icon="iconamoon:close-fill"/>
            </div>
            <div className={'menu-option'} onClick={() => navigateHandler('chat')}>
                <Icon icon="material-symbols:chat"/>
                <span>Chat</span>
            </div>
            <div className={'menu-option'} onClick={() => navigateHandler('create-group')}>
                <Icon icon="el:group"/>
                <span>Create a Group</span>
            </div>
            <div className={'menu-option'} onClick={() => navigateHandler('join-group')}>
                <Icon icon="material-symbols:join-outline"/>
                <span>Join a Group</span>
            </div>
            <div className={'menu-option'} onClick={() => navigateHandler('edit-profile')}>
                <Icon icon="material-symbols:edit"/>
                <span>Edit Profile</span>
            </div>
            <div className={'menu-option'} onClick={()=>authCtx?.logoutHandler()}>
                <Icon icon="material-symbols:logout"/>
                <span>Logout</span>
            </div>
        </div>
    );
};

export default Dropdown;