import Lottie from "lottie-react";

import HomepageAnimation from "../../../animations/Homepage.json";
import AuthenticationIntroFeatures from "./AuthenticationIntroFeatures/AuthenticationIntroFeatures";

import "./AuthenticationIntro.css";

const AuthenticationIntro = () => {
  return (
    <div className={"flex-center authentication-intro"}>
      <h3>Chat, Connect, Conquer!</h3>
      <AuthenticationIntroFeatures />
      <div className={"authentication-into-img"}>
        <Lottie animationData={HomepageAnimation} loop={true} />
      </div>
    </div>
  );
};

export default AuthenticationIntro;
