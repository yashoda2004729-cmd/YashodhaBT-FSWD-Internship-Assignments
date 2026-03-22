import React, { useState } from "react";
import "./App.css";

function App() {
  const [mood, setMood] = useState("Neutral");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const moods = {
    Happy: "😊",
    Sad: "😢",
    Angry: "😡",
    Excited: "🤩",
    Neutral: "😐"
  };

  const handleMood = (selectedMood) => {
    setMood(selectedMood);
    setHistory([...history, moods[selectedMood]]);
  };

  return (
    <div className={darkMode ? "container dark" : "container"}>

      <h1>Mood Tracker</h1>

      <h2>
        {moods[mood]} You are feeling {mood}
      </h2>

      <div className="buttons">
        <button onClick={() => handleMood("Happy")}>Happy</button>
        <button onClick={() => handleMood("Sad")}>Sad</button>
        <button onClick={() => handleMood("Angry")}>Angry</button>
        <button onClick={() => handleMood("Excited")}>Excited</button>
      </div>

      <button className="toggle" onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode
      </button>

      <h3>Mood History</h3>
      <div className="history">
        {history.map((m, index) => (
          <span key={index}>{m}</span>
        ))}
      </div>

    </div>
  );
}

export default App;