// import React, { useContext } from "react";
// import "./App.css";
// import aiImg from "./assets/ai.png";
// import speakImg from "./assets/speak.gif";
// import voiceImg from "./assets/aiVoice.gif";
// import { CiMicrophoneOn } from "react-icons/ci";
// import { datacontext } from "./context/UserContext";

// const App = () => {
//   const {
//     recognition,
//     speaking,
//     setSpeaking,
//     promptText,
//     setPromptText,
//     responseVoiceImg,
//     setResponseVoiceImg,
//     isCopied,
//     setCopied,
//   } = useContext(datacontext);
//   console.log("recognition", recognition);
//   return (
//     <div className="main">
//       <div className="header">
//         <h1>Speech to Text Converter</h1>
//         <p>
//           Effortlessly convert speech to text using your microphone. and click
//           on copy to clipboard to copy the text
//         </p>
//       </div>

//       <div className="input-container">
//         <textarea
//           rows="10"
//           cols="30"
//           value={promptText}
//           onChange={(e) => setPromptText(e.target.value)}
//           placeholder="Your text will appear here..."
//         ></textarea>
//       </div>

//       <div className="controls">
//         {!speaking ? (
//           <div style={{ display: "flex", gap: "20px" }}>
//             <button
//               className="speak-btn"
//               onClick={() => {
//                 window.speechSynthesis.cancel();
//                 setSpeaking(true);
//                 setResponseVoiceImg(false);
//                 recognition.start();
//               }}
//             >
//               <CiMicrophoneOn className="mic-icon" />
//               Start Speaking
//             </button>
//           </div>
//         ) : (
//           <div>
//             <button
//               className="speak-btn"
//               onClick={() => {
//                 if (recognition.stop()) {
//                   setSpeaking(false);
//                 }
//                 // recognition.stop();
//                 window.speechSynthesis.cancel();
//               }}
//             >
//               Stop Speaking
//             </button>
//           </div>
//         )}
//       </div>

//       <button
//         className="copy-btn"
//         onClick={() => {
//           navigator.clipboard.writeText(promptText);
//           setCopied(true);
//         }}
//       >
//         {isCopied ? "Copied!" : "Copy to Clipboard"}
//       </button>
//     </div>
//   );
// };

// export default App;
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
    isCopied,
    setCopied,
  } = useContext(datacontext);

  // Start speech recognition
  const startRecognition = () => {
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    setSpeaking(true);
    recognition.start(); // Start listening
  };

  // Stop speech recognition
  const stopRecognition = () => {
    setSpeaking(false);
    recognition.stop(); // Stop listening
  };

  return (
    <div className="main">
      <div className="header">
        <h1>Speech to Text Converter</h1>
        <p>
          Effortlessly convert speech to text using your microphone. Click on
          "Stop Speaking" to stop.
        </p>
      </div>

      <div className="input-container">
        <textarea
          rows="10"
          cols="30"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="Your text will appear here..."
        ></textarea>
      </div>

      <div className="controls">
        {!speaking ? (
          <div style={{ display: "flex", gap: "20px" }}>
            <button className="speak-btn" onClick={startRecognition}>
              <CiMicrophoneOn className="mic-icon" />
              Start Speaking
            </button>
          </div>
        ) : (
          <div>
            <button className="speak-btn" onClick={stopRecognition}>
              Stop Speaking
            </button>
          </div>
        )}
      </div>

      <button
        className="copy-btn"
        onClick={() => {
          navigator.clipboard.writeText(promptText);
          setCopied(true);
        }}
      >
        {isCopied ? "Copied!" : "Copy to Clipboard"}
      </button>
    </div>
  );
};

export default App;
