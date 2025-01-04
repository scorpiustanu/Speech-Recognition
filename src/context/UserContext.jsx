import React, { createContext, useState } from "react";
import run from "../gemini";
import { use } from "react";
export const datacontext = createContext();
function UserContext({ children }) {
  let [speaking, setSpeaking] = useState(false);
  let [promptText, setPromptText] = useState("listening....");
  let [responseVoiceImg, setResponseVoiceImg] = useState(false);

  //   const speak = (text) => {
  //     let text_speak = new SpeechSynthesisUtterance(text);
  //     text_speak.volume = 1;
  //     text_speak.rate = 1;
  //     text_speak.pitch = 1;
  //     text_speak.lang = "en-GB";
  //     window.speechSynthesis.speak(text_speak);
  //   };
  const speak = (text) => {
    if (!window.speechSynthesis) {
      console.error("SpeechSynthesis API is not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel();

    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "en-US";

    const voices = window.speechSynthesis.getVoices();
    text_speak.voice =
      voices.find((voice) => voice.lang === "en-US") || voices[0];

    if (!text_speak.voice) {
      console.error("No suitable voice found for en-GB.");
    }

    window.speechSynthesis.speak(text_speak);
  };

  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();
  recognition.onresult = (e) => {
    const resultIndex = e.resultIndex;
    const transcript = e.results[resultIndex][0].transcript;
    setPromptText(transcript);
    takeCommand(transcript.toLowerCase());
  };

  //airesponse
  const airesponse = async (prompt) => {
    try {
      const text = await run(prompt);
      const newText =
        text.split("**") &&
        text.split("*") &&
        text.replace("google", "Tanu Tiwari") &&
        text.replace("Google", "Tanu Tiwari");
      console.log("AI Response:", text);
      if (newText) {
        recognition.stop();
        setPromptText(newText);

        speak(newText);
        setResponseVoiceImg(true);
        setTimeout(() => {
          setSpeaking(false);
        }, 5000);
      } else {
        console.error("Empty response from AI.");
      }
    } catch (err) {
      console.error("Error in airesponse:", err);
    }
  };

  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("opening youtube");
      setPromptText("opening youtube");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.com/", "_blank");
      speak("opening google");
      setResponseVoiceImg(true);
      setPromptText("opening google");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("open") && command.includes("instagram")) {
      window.open("https://www.instagram.com/", "_blank");
      speak("opening instagram");
      setResponseVoiceImg(true);

      setPromptText("opening instagram");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("open") && command.includes("facebook")) {
      window.open("https://www.facebook.com/", "_blank");
      speak("opening facebook");
      setResponseVoiceImg(true);

      setPromptText("opening facebook");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else {
      airesponse(command);
    }
  }
  const value = {
    recognition,
    speaking,
    setSpeaking,
    promptText,

    setPromptText,
    responseVoiceImg,
    setResponseVoiceImg,
  };
  return <datacontext.Provider value={value}>{children}</datacontext.Provider>;
}

export default UserContext;
