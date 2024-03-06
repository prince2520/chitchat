import { Icon } from "@iconify/react";

import "./CustomInput.css";

const CustomInput = ({ type, icon, label, showLabel = true, defaultValue=null }) => {
  return (
    <div style={{width:'100%'}}>
      {showLabel && <h5 className="color-text-extra-light">{label}</h5>}
      <div className="flex-center rounded-corner  input-container">
        <input type={type} defaultValue={defaultValue}/>
        <Icon icon={icon} fontSize={"1.5rem"} />
      </div>
    </div>
  );
};

export default CustomInput;
