import {Icon} from "@iconify/react";

import './MessageOther.css';

const MessageOther = ({messageDetail}) => {
    return (
      <div className={'message-other'} style={{backgroundColor: 'var(--background)'}}>
          <div className={'message-other-icon'}>
              <Icon icon="solar:folder-with-files-bold" />
          </div>
          <div className="message-other-content">
              <div className='message-other-content-name'>
                  {messageDetail.message}
              </div>
              <div className='message-other-content-type'>
                  <span>Type: </span>
                  <span>{messageDetail.messageType.toUpperCase()}</span>
              </div>
          </div>
          <div className={'message-other-size'}>
              {messageDetail.size.toFixed(4)} MB
          </div>
          <div className={'message-other-download'}>
              <a download href={messageDetail.url}><Icon icon="ic:round-download" /></a>
          </div>
      </div>
    );
};

export default MessageOther;