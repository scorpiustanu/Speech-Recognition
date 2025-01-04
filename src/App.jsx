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
  } = useContext(datacontext);
  return (
    <div>
      <div className="main">
        <img src={aiImg} alt="" id="shifra" />
        <span>I'm Tanu,Your Advanced Virtual Assistant </span>
        <span>
          {!speaking ? (
            <>
              <button
                onClick={() => {
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
          ) : (
            <div className="response">
              {!responseVoiceImg ? (
                <img src={speakImg} id="speak" alt="" />
              ) : (
                <img src={voiceImg} id="aivoicespeak" alt="" />
              )}
              <p>{promptText}</p>
            </div>
          )}
        </span>
        {/* <p>{userText}</p> */}
      </div>
    </div>
  );
};

export default App;
