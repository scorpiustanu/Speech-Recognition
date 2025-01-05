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
//   console.log("promptText", promptText);

//   return (
//     <div>
//       <div className="main">
//         <h2>Speech to Text Converter</h2>
//         <br />
//         <p>
//           A React hook that converts speech from the microphone to text and
//           makes it available to your React components.
//         </p>
//         <span>
//           {!speaking && (
//             <>
//               <button
//                 onClick={() => {
//                   window.speechSynthesis.cancel(); // Stop any ongoing speech
//                   setPromptText("listening....");
//                   setSpeaking(true);
//                   setResponseVoiceImg(false);
//                   recognition.start();
//                 }}
//               >
//                 Click to speak
//                 <CiMicrophoneOn className="mic" />
//               </button>
//             </>
//           )}
//         </span>

//         <textarea
//           rows="10"
//           cols="30"
//           value={promptText}
//           onChange={(e) => setPromptText(e.target.value)}
//         ></textarea>
//         <span>
//           <button onClick={setCopied}>
//             {isCopied ? "Copied!" : "Copy to clipboard"}
//           </button>
//         </span>
//       </div>
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
    responseVoiceImg,
    setResponseVoiceImg,
    isCopied,
    setCopied,
  } = useContext(datacontext);

  return (
    <div className="main">
      <div className="header">
        <h1>Speech to Text Converter</h1>
        <p>
          Effortlessly convert speech to text using your microphone. and click
          on copy to clipboard to copy the text
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
        <button
          className="speak-btn"
          onClick={() => {
            window.speechSynthesis.cancel();
            setSpeaking(true);
            setResponseVoiceImg(false);
            recognition.start();
          }}
        >
          <CiMicrophoneOn className="mic-icon" />
          Start Speaking
        </button>
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
