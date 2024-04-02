import Lottie from "lottie-react";

import LoadingAnimation from "../../assests/animations/Loading.json";

import "./Loading.css";

const Loading = () => {
  return (
    <div className={"loading-container-icon"}>
      <Lottie animationData={LoadingAnimation} loop={true} />
    </div>
  );
};

export default Loading;
