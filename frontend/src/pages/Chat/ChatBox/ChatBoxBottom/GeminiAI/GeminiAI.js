import { useState } from "react";
import { Icon } from "@iconify/react";

import "./GeminiAI.css";

const GeminiAI = ({ isGeminiAIHandler }) => {
  const [selectedGeminiAI, setSelectedGeminiAI] = useState(false);

  return (
    <div
      className={`flex-center gemini-ai ${selectedGeminiAI && `gemini-ai-selected`}`}
      onClick={() => {
        isGeminiAIHandler(!selectedGeminiAI);
        setSelectedGeminiAI(!selectedGeminiAI);
      }}
    >
      <Icon icon="ri:openai-fill" />
    </div>
  );
};

export default GeminiAI;
