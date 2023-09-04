import {Icon} from "@iconify/react";
import {OverlayActions} from "../../store/overlay";
import {useDispatch} from "react-redux";

import './SideBar.css';

const SideBarIcon = () => {
    const dispatch = useDispatch();

    return (
        <div className={'sidebar_container cursor-btn'}>
            <Icon
                onClick={()=>dispatch(OverlayActions.openSideMobileBarHandler())}
                icon="ic:round-menu"
                color={'var(--text)'}
                fontSize={'2rem'}/>
        </div>
    );
};

export default SideBarIcon;