import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import './CustomEmoji.css';

const CustomEmoji = ({inputRef}) => {
    return (
        <div className='emoji-container'>
            <Picker
                theme={'dark'}
                data={data}
                onEmojiSelect={(event)=>inputRef.current.value += event.native} />
        </div>
    )
};

export default CustomEmoji;