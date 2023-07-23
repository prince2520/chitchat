import './ChatBoxMiddle.css';
import Message from "./Message/Message";

import {useSelector} from "react-redux";

const ChatBoxMiddle = () => {
    const messages = useSelector(state => state.chat.messages);
    const username = useSelector(state => state.user.username);

    return (
        <div className='chat-box-middle border'>
            {messages.map(res =>
                <Message
                    messageDetail={res}
                    myMsg={(res.username === username)}
                    />)}
        </div>
    );
};

export default ChatBoxMiddle;