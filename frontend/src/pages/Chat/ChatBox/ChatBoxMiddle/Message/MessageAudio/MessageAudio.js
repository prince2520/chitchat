import React from "react";

import './MessageAudio.css';
const MessageAudio = ({url}) => {
    return (
        <div className={'message-audio'}>
            <audio src={url} controls/>
        </div>
    );
};

export default React.memo(MessageAudio);