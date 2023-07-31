import {useState} from "react";
import {Icon} from "@iconify/react";

import './OpenAI.css';

const OpenAI = ({isOpenAIHandler}) => {
    const [selectedOpenAI, setSelectedOpenAI] = useState(false);

    return (
        <div className={`open-ai-container ${selectedOpenAI && `open-ai-selected`}`}
             onClick={()=> {
                 isOpenAIHandler(!selectedOpenAI);
                 setSelectedOpenAI(!selectedOpenAI);
             }}>
            <Icon icon="ri:openai-fill"/>
        </div>
    );
};

export default OpenAI;