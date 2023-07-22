import {useSelector} from "react-redux";

import './AlertBox.css'

const AlertBox = () => {
    const alertBoxData = useSelector(state => state.alert);

    return (
        <div className={'alert-box-page'}>
            <div className={`alert-box-container ${alertBoxData.success ? 'success' : 'error'}`}>
                <h3>{alertBoxData.success ? 'Success' : 'Error'}</h3>
                <p>{alertBoxData.message}</p>
            </div>
        </div>
    );
};

export default AlertBox;