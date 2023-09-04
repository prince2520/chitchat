
import './Loading.css'
import Lottie from "lottie-react";
import LoadingAnimation from "../../animations/Loading.json";

const Loading = () => {
    return (
        <div className={'loading-container-icon'}>
            <Lottie animationData={LoadingAnimation} loop={true} />
        </div>
    )
};

export default Loading;