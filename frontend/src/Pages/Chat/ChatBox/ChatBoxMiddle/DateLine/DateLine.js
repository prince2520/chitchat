import {getFormatDate} from "../../../common_function";

import './DateLine.css';

const DateLine = ({createdAt}) => {
    return (
        <div className={'date-line-bar align-center'}>
            <div className={'date-line-bar-line'}/>
            <span>{getFormatDate(createdAt)}</span>
        </div>

    );
};

export default DateLine;