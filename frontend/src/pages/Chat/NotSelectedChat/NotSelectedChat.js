import Lottie from "lottie-react";

import SideBar from "../../../components/SideBar/SideBar";
import NoChatSelectedAnimation from "../../../assests/animations/NoChatSelected.json";

import "./NotSelectedChat.css";

const NotSelectedChat = () => {
  return (
    <div className="not_selected_chat__container">
      <SideBar />
      <div className={"flex-center not_selected_chat_context"}>
        <div className={"flex-center not_selected_chat__img_container "}>
          <Lottie animationData={NoChatSelectedAnimation} loop={true} />
        </div>
        <h3>Welcome To ChatApp</h3>
        <p className="color-text-light">Time to be Social, Go Social</p>
      </div>
    </div>
  );
};

export default NotSelectedChat;
