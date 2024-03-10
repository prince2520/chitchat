import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";

import Lottie from "lottie-react";
import ErrorAnimation from "../../assests/animations/Error.json";
import SuccessAnimation from "../../assests/animations/Success.json";

import { AlertBoxActions } from "../../store/alertSlice";

import "./AlertBox.css";

const AlertBox = () => {
  const dispatch = useDispatch();

  const alertBoxData = useSelector((state) => state.alert);

  return (
    <div className={"flex-center alert-box"}>
      <div
        className={`alert-box__container box-shadow ${
          alertBoxData.success ? "success" : "error"
        }`}
      >
        <div className={"alert-box__container__left"}>
          <Lottie
            animationData={
              alertBoxData.success ? SuccessAnimation : ErrorAnimation
            }
            loop={false}
          />
        </div>
        <div className={"alert-box__container__right align-center"}>
          <h3>{alertBoxData.success ? "Success" : "Error"}</h3>
          <p>{alertBoxData.message}</p>
        </div>
        <div className={"alert-box__container__close cursor-btn align-center"}>
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
