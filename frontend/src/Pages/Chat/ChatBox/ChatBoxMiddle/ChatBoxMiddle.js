import { useSelector} from "react-redux";

import Message from "./Message/Message";

import './ChatBoxMiddle.css';

const ChatBoxMiddle = () => {
    const messages = useSelector(state => state.chat.messages);
    const username = useSelector(state => state.user.username);

    return (
        <div className='chat-box-middle border'>
            {messages.map((res, idx) =>
                <Message
                    id={idx}
                    messageDetail={res}
                    myMsg={(res.username === username)}
                    />)}
        </div>
    );
};

export default ChatBoxMiddle;