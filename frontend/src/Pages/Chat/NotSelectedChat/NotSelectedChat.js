import SideBar from "../../../Helper/SideBar/SideBar";

import './NotSelectedChat.css'

const NotSelectedChat = () => {
    return (
        <div className="not_selected_chat_container">
            <SideBar/>
            <div className={'not_selected_chat_context'}>
                <div className={'not_selected_chat__img_container box-shadow'}>
                    <img src="https://i.imgur.com/MOS6l7X.png" alt="welcome_page"/>
                </div>
                <h1>Welcome To ChatApp</h1>
                <p>Time to be Social, Go Social</p>
            </div>
        </div>
    );
}

export default NotSelectedChat;
