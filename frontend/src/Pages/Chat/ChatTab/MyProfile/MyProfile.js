import {Icon} from "@iconify/react";
import {useDispatch, useSelector} from "react-redux";

import ImageContainer from "../../../../components/ImageContainer/ImageContainer";
import Dropdown from "../../../../components/Dropdown/Dropdown";

import {HelperActions} from "../../../../store/helper";

import './MyProfile.css';

const MyProfile = () => {
    const showDropdown = useSelector(state => state.helper.showDropdown);
    const profileImageUrl = useSelector(state => state.user.profileImageUrl);
    const dispatch = useDispatch();

    return (
        <div className={'my-profile-container border'}>
            <ImageContainer src={profileImageUrl}/>
            <span  onClick={()=>dispatch(HelperActions.dropDownHandler(!showDropdown))}>
                <Icon icon="gridicons:dropdown" style={{color:'var(--text)', fontSize:'3rem', cursor:'pointer'}}/>
            </span>
            {showDropdown && <Dropdown/>}
        </div>
    );
};
export default MyProfile;