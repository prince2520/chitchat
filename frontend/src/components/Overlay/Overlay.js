import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";

import Model from "./Model/Model";
import { useSelector } from "react-redux";

import { OverlayActions } from "../../store/overlay";

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
        color={"var(--white)"}
        fontSize={"3rem"}
      />
    </div>
  );
};

export default Overlay;
