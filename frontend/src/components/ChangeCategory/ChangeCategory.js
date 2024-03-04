import { useState } from "react";

import { categoryState } from "../../common";

import "./ChangeCategory.css";

const ChangeCategory = ({ setIsPrivate }) => {
  const [selectedChat, setSelectedChat] = useState(categoryState[0]);

  return (
    <div className="flex-center change-category">
      {categoryState.map((name, idx) => (
        <p
          key={idx}
          onClick={() => {
            name === categoryState[0]
              ? setIsPrivate(false)
              : setIsPrivate(true);
            setSelectedChat(name);
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
