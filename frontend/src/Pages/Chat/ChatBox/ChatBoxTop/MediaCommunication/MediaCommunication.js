import React from "react";
import {Icon} from "@iconify/react";

const MediaCommunication = () => {
    return (
        <React.Fragment>
            <Icon icon="tabler:video" style={{color: 'var(--text)', fontSize: '2.5rem', cursor: 'pointer'}} />
            <Icon icon="mi:call" style={{color: 'var(--text)', fontSize: '2.5rem', cursor: 'pointer'}} />
        </React.Fragment>
    );
};

export default MediaCommunication;