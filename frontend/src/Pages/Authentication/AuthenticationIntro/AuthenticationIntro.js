import Lottie from "lottie-react";

import { chatFeatures } from "../../../constants/constants";

import HomepageAnimation from "../../../animations/Homepage.json";

import "./AuthenticationIntro.css";

const AuthenticationIntro = () => {
  return (
    <div className={"flex-center authentication-intro"}>
      <h3>Chat, Connect, Conquer!</h3>
      <div className={"flex-center authentication-intro__features"}>
        {chatFeatures.map((feature, index) => (
          <div
            className={
              "flex-center border authentication-intro__features__feature"
            }
          >
            <div className={"authentication-intro__features__feature__icon"}>
              <Lottie animationData={feature.animation} />
            </div>
            <p className="color-text-light">{feature.text}</p>
          </div>
        ))}
      </div>
      <div className={"authentication-intro__img"}>
        <Lottie animationData={HomepageAnimation} loop={true} />
      </div>
    </div>
  );
};

export default AuthenticationIntro;
