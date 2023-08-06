import {Outlet} from "react-router-dom";

import './Authentication.css';
import AuthenticationIntro from "./AuthenticationIntro/AuthenticationIntro";
import Logo from "../../Helper/Logo/Logo";

const Authentication = () => {
    return (
        <div className='authentication-page  align-center'>
            <div className={'authentication-page-left align-center'}>
                <div className={'authentication-page-left-logo'}>
                    <Logo/>
                </div>
                <Outlet/>
            </div>
            <div className={'authentication-page-right box-shadow'}>
                <AuthenticationIntro/>
            </div>
        </div>
    );
};

export default Authentication;