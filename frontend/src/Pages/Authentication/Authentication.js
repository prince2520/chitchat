import {Outlet} from "react-router-dom";

import Logo from "../../components/Logo/Logo";
import AuthenticationIntro from "./AuthenticationIntro/AuthenticationIntro";

import './Authentication.css';

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