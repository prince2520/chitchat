import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";

import Lottie from "lottie-react";
import ErrorAnimation from "../../animations/Error.json";
import SuccessAnimation from "../../animations/Success.json";

import { AlertBoxActions } from "../../store/alert";

import "./AlertBox.css";

const AlertBox = () => {
  const dispatch = useDispatch();

  const alertBoxData = useSelector((state) => state.alert);

  return (
    <div className={"alert-box-page"}>
      <div
        className={`alert-box-container box-shadow ${
          alertBoxData.success ? "success" : "error"
        }`}
      >
        <div className={"alert-box-container-left"}>
          <Lottie
            animationData={
              alertBoxData.success ? SuccessAnimation : ErrorAnimation
            }
            loop={false}
          />
        </div>
        <div className={"alert-box-container-right align-center"}>
          <h3>{alertBoxData.success ? "Success" : "Error"}</h3>
          <p>{alertBoxData.message}</p>
        </div>
        <div className={"alert-box-container-close cursor-btn align-center"}>
          <Icon
            icon="iconamoon:close-bold"
            onClick={() => dispatch(AlertBoxActions.closeAlertBoxHandler())}
          />
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
