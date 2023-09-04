import Lottie from "lottie-react";
import ChitChatAnimation from '../../animations/ChitChat.json'

import './Logo.css'

const Logo = () => {
    return (
        <div className={'logo-container align-center'}>
            <span className={'logo-img'}>
                <Lottie animationData={ChitChatAnimation} loop={false}/>
            </span>
            <span className={'logo-name'}>ChitChat</span>
        </div>
    );
};
export default Logo;