import Lottie from "lottie-react";

import ChitChatAnimation from '../../assests/animations/ChitChat.json'

import './Logo.css'

const Logo = () => {
    return (
        <div className={'flex-center logo-container'}>
            <span className={'logo-img'}>
                <Lottie animationData={ChitChatAnimation} loop={false}/>
            </span>
            <h4 className={'logo-name'}>ChitChat</h4>
        </div>
    );
};
export default Logo;