import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import './CustomEmoji.css';

const CustomEmoji = () => {
    return (
        <div className='emoji-container'>
            <Picker
                theme={'dark'}
                data={data}
                onEmojiSelect={console.log} />
        </div>
    )
};

export default CustomEmoji;