import Lottie from "lottie-react";

import HomepageAnimation from "../../../animations/Homepage.json";
import AuthenticationIntroFeatures from "./AuthenticationIntroFeatures/AuthenticationIntroFeatures";

import './AuthenticationIntro.css'

const AuthenticationIntro = () => {
    return (
        <div className={'authentication-intro align-center'}>
            <h2>Chat, Connect, Conquer!</h2>
            <AuthenticationIntroFeatures/>
            <div className={'authentication-into-img'}>
                <Lottie animationData={HomepageAnimation} loop={true} />
            </div>
        </div>
    );
};

export default AuthenticationIntro;