import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";

import { OverlayActions } from "../../redux/slice/overlaySlice";

import "./SideBar.css";

const SideBarIcon = () => {
  const dispatch = useDispatch();

  return (
    <div className={"sidebar_container cursor-btn"}>
      <Icon
        onClick={() => dispatch(OverlayActions.openSideMobileBarReducer())}
        icon="ic:round-menu"
        fontSize={"2rem"}
      />
    </div>
  );
};

export default SideBarIcon;
