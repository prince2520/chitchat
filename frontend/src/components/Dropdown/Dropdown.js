import { useContext } from "react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/authContext";

import "./Dropdown.css";

const menuOption = [
  {
    title: "Chat",
    icon: "material-symbols:chat",
    link: "/chat",
  },
  {
    title: "Create a Group",
    icon: "el:group",
    link: "create-group",
  },
  {
    title: "Join a Group",
    icon: "material-symbols:join-outline",
    link: "join-group",
  },
  {
    title: "Edit Profile",
    icon: "material-symbols:edit",
    link: "edit-profile",
  },
];

const Dropdown = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const navigateHandler = (url) => {
    navigate(url);
  };

  return (
    <div className={"menu-container box-shadow"}>
      {menuOption.map((value) => (
        <div
          key={value.icon}
          className={"cursor-btn menu-option"}
          onClick={() => navigateHandler(value.link)}
        >
          <Icon icon={value.icon} />
          <h5 className="color-text">{value.title}</h5>
        </div>
      ))}
      <div
        className={"cursor-btn menu-option"}
        onClick={() => authCtx?.logoutHandler()}
      >
        <Icon icon="material-symbols:logout" />
        <h5 className="color-text">Logout</h5>
      </div>
    </div>
  );
};

export default Dropdown;
