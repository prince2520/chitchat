import './Model.css';
import ChatTab from "../../../Pages/Chat/ChatTab/ChatTab";
import {useDispatch, useSelector} from "react-redux";
import DragAndDrop from "../../DragAndDrop/DragAndDrop";
import {OverlayActions} from "../../../store/overlay";
import React from "react";
const Model = () => {
    const overlay = useSelector(state => state.overlay);
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            {(overlay.showSideMobileBar) && <div className={'model-container model-container-chat-tab box-shadow'}>
                <ChatTab/>
            </div>}
            {(overlay.showDragDrop) && <div className={'model-container flex-center'} onClick={()=>dispatch(OverlayActions.closeOverlayHandler())}>
                <div className={'model-container-background'}/>
                <DragAndDrop/>
            </div>}
        </React.Fragment>
    );
};

export default Model;