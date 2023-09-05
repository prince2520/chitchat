import {Icon} from "@iconify/react";
import {useDispatch} from "react-redux";

import Model from "./Model/Model";

import {OverlayActions} from "../../store/overlay";

import './Overlay.css';

const Overlay = () => {
    const dispatch = useDispatch();

    return (
        <div className={'overlay-page '}>
            <div className={'overlay-container'} onClick={()=>dispatch(OverlayActions.closeOverlayHandler())}/>
            <Model/>
            <Icon
                onClick={()=>dispatch(OverlayActions.closeOverlayHandler())}
                className={'close-btn'}
                icon="iconamoon:close-bold"
                color={'var(--white)'}
                fontSize={'3rem'} />
        </div>
    );
};

export default Overlay;