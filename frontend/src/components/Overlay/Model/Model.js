import React from "react";

import {useDispatch, useSelector} from "react-redux";

import ChatTab from "../../../Pages/Chat/ChatTab/ChatTab";
import DragAndDrop from "../../DragAndDrop/DragAndDrop";

import {OverlayActions} from "../../../store/overlay";

import './Model.css';

const Model = () => {
    const overlay = useSelector(state => state.overlay);
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            {(overlay.showSideMobileBar) && <div className={'model-container model-container-chat-tab box-shadow'}>
                <ChatTab/>
            </div>}
            {(overlay.showDragDrop) && <div className={'model-container flex-center'} >
                <div className={'model-container-background'} onClick={()=>dispatch(OverlayActions.closeOverlayHandler())}/>
                <DragAndDrop/>
            </div>}
        </React.Fragment>
    );
};

export default Model;