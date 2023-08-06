import './NoMessage.css';

import Lottie from "lottie-react";

import NoMessageAnimation from "../../../../animations/Circle.json"


const NoMessage = () => {
    return(
        <div className='noMessage_box'>
            <div className='noMessage_box-imageContainer'>
                <Lottie animationData={NoMessageAnimation} loop={true} />
                {/*<img src="https://i.imgur.com/SYbQZXR.jpg" alt="noMessage_image"/>*/}
            </div>
        </div>
    )
}

export default NoMessage;
