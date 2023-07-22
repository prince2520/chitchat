import './MyProfile.css';
import {Icon} from "@iconify/react";
import ImageContainer from "../../../../Helper/ImageContainer/ImageContainer";
import Dropdown from "../../../../Helper/Dropdown/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {HelperActions} from "../../../../store/helper";

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