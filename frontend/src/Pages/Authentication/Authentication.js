import { Outlet } from "react-router-dom";

import Logo from "../../components/Logo/Logo";
import AuthenticationIntro from "./AuthenticationIntro/AuthenticationIntro";

import "./Authentication.css";

const Authentication = () => {
  return (
    <div className="full-screen flex-center authentication-page">
      <div className={"flex-center authentication-page-left"}>
        <div className={"authentication-page-left-logo"}>
          <Logo />
        </div>
        <Outlet />
      </div>
      <div className={"authentication-page-right box-shadow"}>
        <AuthenticationIntro />
      </div>
    </div>
  );
};

export default Authentication;
