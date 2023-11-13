import {Icon} from "@iconify/react";
import {useDispatch, useSelector} from "react-redux";

import Dropdown from "../../../../components/Dropdown/Dropdown";
import ImageContainer from "../../../../components/ImageContainer/ImageContainer";

import {HelperActions} from "../../../../store/helper";

import {useDetectClickOutside} from "react-detect-click-outside";

import './MyProfile.css';

const MyProfile = () => {
    const showDropdown = useSelector(state => state.helper.showDropdown);
    const profileImageUrl = useSelector(state => state.user.profileImageUrl);
    const dispatch = useDispatch();

    const closeDropDownHandler = () => {
        dispatch(HelperActions.dropDownHandler(false));
    }

    const ref = useDetectClickOutside({ onTriggered: closeDropDownHandler});

    return (
        <div className={'my-profile-container border'}>
            <ImageContainer src={profileImageUrl}/>
            <span onClick={()=>dispatch(HelperActions.dropDownHandler(!showDropdown))}>
                <Icon ref={ref} icon="gridicons:dropdown" style={{color:'var(--text)', fontSize:'3rem', cursor:'pointer'}}/>
            </span>
            {showDropdown && <Dropdown/>}
        </div>
    );
};
export default MyProfile;