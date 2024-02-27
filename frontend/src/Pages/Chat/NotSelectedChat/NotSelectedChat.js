import Lottie from "lottie-react";

import SideBar from "../../../components/SideBar/SideBar";
import NoChatSelectedAnimation from "../../../animations/NoChatSelected.json"

import './NotSelectedChat.css'

const NotSelectedChat = () => {
    return (
        <div className="not_selected_chat_container">
            <SideBar/>
            <div className={'flex-center not_selected_chat_context'}>
                <div className={'flex-center not_selected_chat__img_container '}>
                    <Lottie animationData={NoChatSelectedAnimation} loop={true} />
                </div>
                <h2>Welcome To ChatApp</h2>
                <p className="color-text-light">Time to be Social, Go Social</p>
            </div>
        </div>
    );
}

export default NotSelectedChat;
