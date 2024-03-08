import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";

import { OverlayActions } from "../../../../../store/overlaySlice";
import { chatTopSettingOptions } from "../../../../../constants/constants";

import "./Setting.css";

const Setting = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex-center box-shadow border setting">
      {chatTopSettingOptions.map((option) => (
        <div className={"cursor-btn flex-center setting__option"} onClick={()=>dispatch(OverlayActions.openSettingsHandler({
          value: true,
          link : option.title
        }))}>
          <Icon className="color-text-light" icon={option.icon} />
          <h5 className="color-text-light">{option.title}</h5>
        </div>
      ))}
      <div className="cursor-btn flex-center setting__option">
        <Icon color='var(--error)' className="color-text-light" icon={"material-symbols:delete-outline"} />
        <h5 style={{color: 'var(--error)'}}>Remove</h5>
      </div>
    </div>
  );
};

export default Setting;
