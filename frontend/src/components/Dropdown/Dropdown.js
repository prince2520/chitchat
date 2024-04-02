import { useContext } from "react";
import { Icon } from "@iconify/react";
import { dropDownMenuOptions } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { useDetectClickOutside } from "react-detect-click-outside";


import AuthContext from "../../context/authContext";

import "./Dropdown.css";

const Dropdown = ({closeDropdown, showDropdown}) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const ref = useDetectClickOutside({ 
    onTriggered: closeDropdown,
  });
  
  return (
    <div ref={ref} className={"menu-container box-shadow"}>
      {dropDownMenuOptions.map((value) => (
        <div
          key={value.icon}
          className={"cursor-btn menu-option"}
          onClick={() => navigate(value.link)}
        >
          <Icon icon={value.icon} />
          <h5>{value.title}</h5>
        </div>
      ))}
      <div
        className={"cursor-btn menu-option"}
        onClick={() => authCtx?.logoutHandler()}
      >
        <Icon icon="material-symbols:logout" />
        <h5>Logout</h5>
      </div>
    </div>
  );
};

export default Dropdown;
