import React from "react";


const MessageString = ({message, time}) => {
    return (
        <>
            <div className={'flex-center msg'} style={{columnGap : '0.5rem'}}>
                <p>{message}</p>
                <h6>{time}</h6>
            </div>
        </>
    );
};

export default React.memo(MessageString);