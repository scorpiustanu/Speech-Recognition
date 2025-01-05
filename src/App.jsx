import React, { useContext } from "react";
import "./App.css";
import aiImg from "./assets/ai.png";
import speakImg from "./assets/speak.gif";
import voiceImg from "./assets/aiVoice.gif";
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from "./context/UserContext";
const App = () => {
  const {
    recognition,
    speaking,
    setSpeaking,
    promptText,
    setPromptText,
    responseVoiceImg,
    setResponseVoiceImg,
    isCopied,
    setCopied,
  } = useContext(datacontext);
  console.log("promptText", promptText);

  return (
    <div>
      <div className="main">
        <h2>Speech to Text Converter</h2>
        <br />
        <p>
          A React hook that converts speech from the microphone to text and
          makes it available to your React components.
        </p>
        <span>
          {!speaking && (
            <>
              <button
                onClick={() => {
                  window.speechSynthesis.cancel(); // Stop any ongoing speech
                  setPromptText("listening....");
                  setSpeaking(true);
                  setResponseVoiceImg(false);
                  recognition.start();
                }}
              >
                Click to speak
                <CiMicrophoneOn className="mic" />
              </button>
            </>
          )}
        </span>

        <textarea
          rows="10"
          cols="40"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
        ></textarea>
        <span>
          <button onClick={setCopied}>
            {isCopied ? "Copied!" : "Copy to clipboard"}
          </button>
        </span>
      </div>
    </div>
  );
};

export default App;
