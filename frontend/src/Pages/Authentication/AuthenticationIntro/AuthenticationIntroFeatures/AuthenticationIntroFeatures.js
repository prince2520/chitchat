import AuthenticationIntroFeature from "./AuthenticationIntroFeature/AuthenticationIntroFeature";

import {chatFeatures} from "./authenticationfeatures";

import './AuthenticationIntroFeatures.css';


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