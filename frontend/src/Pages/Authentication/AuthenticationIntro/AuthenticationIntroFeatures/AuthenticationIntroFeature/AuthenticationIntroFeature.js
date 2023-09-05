import Lottie from "lottie-react";

import './AuthenticationIntroFeature.css';
const AuthenticationIntroFeature = ({feature}) => {

    return (
        <div className={'authentication-intro-feature align-center border'}>
            <div className={'authentication-intro-feature-icon'}>
                <Lottie animationData={feature.animation}/>
            </div>
            <div className={'authentication-intro-feature-text'}>
                <p>
                    {feature.text}
                </p>
            </div>

        </div>
    );

};

export default AuthenticationIntroFeature;