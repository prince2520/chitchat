import SideBar from "../../../Helper/SideBar/SideBar";

import Lottie from "lottie-react";

import NoChatSelectedAnimation from "../../../animations/NoChatSelected.json"

import './NotSelectedChat.css'

const NotSelectedChat = () => {
    return (
        <div className="not_selected_chat_container">
            <SideBar/>
            <div className={'not_selected_chat_context'}>
                <div className={'not_selected_chat__img_container '}>
                    <Lottie animationData={NoChatSelectedAnimation} loop={true} />
                </div>
                <h1>Welcome To ChatApp</h1>
                <p>Time to be Social, Go Social</p>
            </div>
        </div>
    );
}

export default NotSelectedChat;
