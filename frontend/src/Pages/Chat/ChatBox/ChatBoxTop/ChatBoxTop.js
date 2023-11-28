import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

import Setting from "./Setting/Setting";
import SideBar from "../../../../components/SideBar/SideBar";
import Category from "../../../../components/Category/Category";
import ImageContainer from "../../../../components/ImageContainer/ImageContainer";

import {Icon} from "@iconify/react";
import {useDetectClickOutside} from "react-detect-click-outside";
import {categoryState} from "../../../../common";

import MediaCommunication from "./MediaCommunication/MediaCommunication";

import './ChatBoxTop.css';

const ChatBoxTop = () => {
    const chat = useSelector(state => state.chat);

    const [showSetting , setShowSetting] = useState(false);

    const closeSettingHandler = () => {
        setShowSetting(false);
    }

    const ref = useDetectClickOutside({ onTriggered: closeSettingHandler});

    return (
        <div className='chat-box-top border'>
            <SideBar/>
            <ImageContainer src={chat.photo}/>
            <div className='chat-description'>
                <span className='chat-name'>{chat.name}</span>
                <span className='chat-created'>{chat.status ? chat.status : chat.createdBy}</span>
            </div>
            <Category title={chat.type}/>
            {chat.type === categoryState[1] && <MediaCommunication/>}
            <Icon onClick={()=>setShowSetting(prevState => !prevState)} ref={ref} icon="gg:more-vertical-o" style={{color: 'var(--text)', fontSize: '2.5rem', cursor: 'pointer'}}/>
            {showSetting && <Setting/>}
        </div>
    );
};

export default ChatBoxTop;