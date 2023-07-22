import {Outlet} from "react-router-dom";

import './Authentication.css';
const Authentication = () => {
    return (
        <div className='authentication-page border box-shadow'>
            <Outlet/>
        </div>
    );
};

export default Authentication;