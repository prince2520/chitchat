import {useState} from "react";

import './ChangeCategory.css';
import {categoryState} from "../../common";

const ChangeCategory = ({setPrivateChatSelected}) => {
    const [selectedChat, setSelectedChat] = useState(categoryState[0]);

    return (
        <div className="change-category border">
            {categoryState.map((name, idx)=>
                <span
                    key={idx}
                    onClick={()=> {
                        if(name===categoryState[0]){
                            setSelectedChat(name);
                            setPrivateChatSelected(false)
                        } else {
                            setSelectedChat(name);
                            setPrivateChatSelected(true)
                        }
                    }}
                    className={`${selectedChat === name && 'selected'}`}>{name}</span>)}
        </div>
    );
};

export default  ChangeCategory;