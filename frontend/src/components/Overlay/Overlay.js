import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";

import { OverlayActions } from "../../store/overlaySlice";

import Model from "./Model/Model";

import "./Overlay.css";

const Overlay = () => {
  const dispatch = useDispatch();
  const overlay = useSelector((state) => state.overlay);

  return (
    <div 
    className={"full-screen flex-center overlay-page"} 
    style={{justifyContent: overlay.showSideMobileBar ? 'flex-start' : 'center'}}>
      <div
        className={"full-screen overlay-container"}
        onClick={() => dispatch(OverlayActions.closeOverlayHandler())}
      />
      <Model />
      <Icon
        onClick={() => dispatch(OverlayActions.closeOverlayHandler())}
        className={"close-btn"}
        icon="iconamoon:close-bold"
        fontSize={"2.5rem"}
      />
    </div>
  );
};

export default Overlay;
