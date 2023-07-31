import {useState} from "react";
import {Icon} from "@iconify/react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import './SpeechToText.css';

const SpeechToText = ({addSpeechText}) => {

    const [listenCond, setListenCond] = useState(false);
    const startListening = () => SpeechRecognition?.startListening({ continuous: true, language: 'en-IN' });

    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
        <div className={'text-to-speech-container'}>
            {transcript}
            <Icon
                style={{color: !listenCond ?  `var(--white)`: 'red' }}
                icon="material-symbols:speech-to-text" />
        </div>
    );
};
export default SpeechToText;