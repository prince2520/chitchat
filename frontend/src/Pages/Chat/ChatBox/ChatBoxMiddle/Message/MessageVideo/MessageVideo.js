import ReactPlayer from 'react-player';

import './MessageVideo.css';

const MessageVideo = ({url}) => {
    return (
        <div className='video-message'>
            <ReactPlayer
                width={"100%"}
                height={"100%"}
                url={url}
                controls={true}/>
        </div>
    );
};

export default MessageVideo;