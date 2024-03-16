import { Icon } from "@iconify/react";

import "./CustomInput.css";

const CustomInput = ({
  type,
  icon,
  label,
  showLabel = true,
  defaultValue = null,
  width = "100%",
  maxWidth = "100%",
  ref = null,
  placeholder = ""
}) => {
  return (
    <div className="custom-input" style={{ width: width, maxWidth: maxWidth }}>
      {showLabel && <p className="color-text-extra-light">{label}</p>}
      <div className="flex-center rounded-corner  custom-input__container">
        <input placeholder={placeholder} ref={ref} type={type} defaultValue={defaultValue} />
        <Icon icon={icon} fontSize={"1.5rem"} />
      </div>
    </div>
  );
};

export default CustomInput;
