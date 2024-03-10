import Lottie from "lottie-react";

import NoMessageAnimation from "../../../../assests/animations/Circle.json";

import './NoMessage.css';

const NoMessage = () => {
    return(
        <div className='full-screen flex-center noMessage'>
            <div className='noMessage__imageContainer'>
                <Lottie animationData={NoMessageAnimation} loop={true} />
                {/*<img src="https://i.imgur.com/SYbQZXR.jpg" alt="noMessage_image"/>*/}
            </div>
        </div>
    )
}

export default NoMessage;
