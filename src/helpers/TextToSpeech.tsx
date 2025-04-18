const TextToSpeech = (text: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(text);
  
      utter.lang = "en-US";
  
      utter.onend = () => {
        resolve(true); // Speech finished successfully
      };
  
      utter.onerror = (e) => {
        console.error("Speech synthesis error:", e);
        resolve(false); // Resolve with false on error
      };
  
      synth.speak(utter);
    });
  };
  
  export default TextToSpeech;
  