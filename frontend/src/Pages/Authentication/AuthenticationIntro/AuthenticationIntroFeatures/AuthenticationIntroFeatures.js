import './AuthenticationIntroFeatures.css';
import {chatFeatures} from "./authenticationfeatures";
import AuthenticationIntroFeature from "./AuthenticationIntroFeature/AuthenticationIntroFeature";

const AuthenticationIntroFeatures = () => {

    return (
        <div className={'authentication-intro-features align-center'}>
            {chatFeatures
                .map(feature =>
                    <AuthenticationIntroFeature feature={feature}/>)}

        </div>
    )

};

export default AuthenticationIntroFeatures;