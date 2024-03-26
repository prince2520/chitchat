import Lottie from "lottie-react";

import NoMessageAnimation from "../../../../assests/animations/Circle.json";

import "./NoMessage.css";

const NoMessage = () => {
  return (
    <div className="full-screen flex-center noMessage">
      <div className="noMessage__imageContainer">
        <Lottie animationData={NoMessageAnimation} loop={true} />
      </div>
    </div>
  );
};

export default NoMessage;
