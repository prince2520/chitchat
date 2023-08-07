import './AuthenticationIntroFeatures.css';
import {chatFeatures} from "./authenticationfeatures";
import AuthenticationIntroFeature from "./AuthenticationIntroFeature/AuthenticationIntroFeature";

const AuthenticationIntroFeatures = () => {

    return (
        <div className={'authentication-intro-features align-center'}>
            {chatFeatures
                .map((feature,index) =>
                    <AuthenticationIntroFeature key={index} feature={feature}/>)}

        </div>
    )

};

export default AuthenticationIntroFeatures;