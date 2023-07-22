import MyProfile from "./MyProfile/MyProfile";
import {Outlet} from "react-router-dom";

import './ChatTab.css';

const ChatTab = () => {
    return (
        <div className="chat-tab">
            <MyProfile/>
            <Outlet/>
        </div>
    );
};

export default ChatTab;