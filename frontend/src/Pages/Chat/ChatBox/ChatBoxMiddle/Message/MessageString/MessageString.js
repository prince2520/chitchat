import React from "react";

import './MessageString.css'

const MessageString = ({message, time}) => {
    return (
        <>
            <div className={'msg'}>
                <span className={'msg-txt'}>{message}</span>
                <span className={'msg-time'}>{time}</span>
            </div>
        </>
    );
};

export default React.memo(MessageString);