import { uid } from "uid";
import { useState } from "react";

import { categoryState } from "../../constants/constants"

import "./ChangeCategory.css";

const ChangeCategory = ({ setIsPrivate }) => {
  const [selectedChat, setSelectedChat] = useState(categoryState[0]);

  return (
    <div className="flex-center change-category">
      {categoryState.map((name) => (
        <p
          key={uid(32)}
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
