import { useState } from "react";

import { categoryState } from "../../common";

import "./ChangeCategory.css";

const ChangeCategory = ({ setPrivateChatSelected }) => {
  const [selectedChat, setSelectedChat] = useState(categoryState[0]);

  return (
    <div className="flex-center change-category">
      {categoryState.map((name, idx) => (
        <p
          key={idx}
          onClick={() => {
            if (name === categoryState[0]) {
              setSelectedChat(name);
              setPrivateChatSelected(false);
            } else {
              setSelectedChat(name);
              setPrivateChatSelected(true);
            }
          }}
          className={`cursor-btn ${selectedChat === name && "selected"}`}
        >
          {name}
        </p>
      ))}
    </div>
  );
};

export default ChangeCategory;
