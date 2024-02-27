import { Icon } from "@iconify/react";

import "./CustomInput.css";

const CustomInput = ({ type, icon, label }) => {
  return (
    <div style={{width:'100%'}}>
      <h5 className="color-text-extra-light">{label}</h5>
      <div className="flex-center rounded-corner  input-container">
        <input type={type} />
        <Icon icon={icon} fontSize={"1.5rem"} />
      </div>
    </div>
  );
};

export default CustomInput;
