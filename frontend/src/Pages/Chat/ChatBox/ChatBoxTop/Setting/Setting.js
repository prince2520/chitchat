import {Icon} from "@iconify/react";
import {settingOption} from "../../../../../common";

import './Setting.css'

const Setting = () => {
    return (
        <div className='setting box-shadow border'>
            {settingOption.map(option =>
                <div className={'setting-option cursor-btn flex-center'}>
                    <Icon icon={option.icon}/>
                    <span>{option.title}</span>
                </div>)}
        </div>
    );
};

export default Setting;