import {useState} from "react";

import {categoryState} from "../../common";

import './ChangeCategory.css';

const ChangeCategory = ({setPrivateChatSelected}) => {
    const [selectedChat, setSelectedChat] = useState(categoryState[0]);

    return (
        <div className="change-category">
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