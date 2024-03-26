import { Outlet } from "react-router-dom";

import Logo from "../../components/Logo/Logo";
import AuthenticationIntro from "./AuthenticationIntro/AuthenticationIntro";

import "./Authentication.css";

const Authentication = () => {
  return (
    <div className="full-screen flex-center authentication-page">
      <div className={"flex-center authentication-page__left"}>
        <div className={"authentication-page__left__logo"}>
          <Logo />
        </div>
        <Outlet />
      </div>
      <div className={"box-shadow authentication-page__right"}>
        <AuthenticationIntro />
      </div>
    </div>
  );
};

export default Authentication;
