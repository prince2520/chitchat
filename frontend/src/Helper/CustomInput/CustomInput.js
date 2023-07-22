import './CustomInput.css';
import {Icon} from "@iconify/react";
const CustomInput = (props) => {
    return (
        <div className='email-container'>
            <label htmlFor="email">{props.label}</label>
            <input defaultValue={props?.defaultValue} type={props.type}  className={'login-input'}/>
            <Icon className={'input-icon'} icon={props.icon} fontSize={'1.5rem'} color={`black`}/>
        </div>
    );
};

export default CustomInput;