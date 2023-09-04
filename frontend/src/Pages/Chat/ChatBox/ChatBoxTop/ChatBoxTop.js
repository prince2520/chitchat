import { useSelector} from "react-redux";

import SideBar from "../../../../components/SideBar/SideBar";
import Category from "../../../../components/Category/Category";
import ImageContainer from "../../../../components/ImageContainer/ImageContainer";

import './ChatBoxTop.css';

const ChatBoxTop = () => {
    const chat = useSelector(state => state.chat);

    return(
        <div className='chat-box-top border'>
            <SideBar/>
            <ImageContainer  src={chat.photo}/>
            <div className='chat-description'>
                <span className='chat-name'>{chat.name}</span>
                <span className='chat-created'>{chat.status ? chat.status : chat.createdBy}</span>
            </div>
            <Category title={chat.type}/>
        </div>
    );
};

export default ChatBoxTop;