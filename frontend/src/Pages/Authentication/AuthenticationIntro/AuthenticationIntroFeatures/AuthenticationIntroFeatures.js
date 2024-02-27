import Lottie from "lottie-react";
import { chatFeatures } from "./featuresData";

import "./AuthenticationIntroFeatures.css";

const AuthenticationIntroFeature = ({ feature }) => {
  return (
    <div className={"flex-center border authentication-intro-feature"}>
      <div className={"authentication-intro-feature-icon"}>
        <Lottie animationData={feature.animation} />
      </div>
      <div className={"authentication-intro-feature-text"}>
        <p className="color-text-light">{feature.text}</p>
      </div>
    </div>
  );
};

const AuthenticationIntroFeatures = () => {
  return (
    <div className={"flex-center authentication-intro-features"}>
      {chatFeatures.map((feature, index) => (
        <AuthenticationIntroFeature key={index} feature={feature} />
      ))}
    </div>
  );
};

export default AuthenticationIntroFeatures;
