import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const emergencies = [
  { id: "accident", icon: "🚗", name: "Accident" },
  { id: "bleeding", icon: "🩸", name: "Severe Bleeding" },
  { id: "unconscious", icon: "😵", name: "Unconscious Person" },
  { id: "fire", icon: "🔥", name: "Fire" }
];

const advice = {
  accident: [
    "Move to a safe location if possible.",
    "Contact local emergency services.",
    "Do not move an injured person unless there is immediate danger.",
    "Follow instructions from emergency responders."
  ],
  bleeding: [
    "Make sure it is safe to help.",
    "Call local emergency services if bleeding is severe.",
    "Apply firm pressure with clean cloth or dressing.",
    "Follow professional medical advice."
  ],
  unconscious: [
    "Check that the area is safe.",
    "Call local emergency services.",
    "Check responsiveness and normal breathing.",
    "Follow the emergency dispatcher's instructions."
  ],
  fire: [
    "Leave the building if you can do so safely.",
    "Call the fire service.",
    "Do not use an elevator during a fire.",
    "Never return to a burning building."
  ]
};

function App() {
  const [selected, setSelected] = useState(null);
  const [showAdvice, setShowAdvice] = useState(false);

  function chooseEmergency(id) {
    setSelected(id);
    setShowAdvice(false);
  }

  function reset() {
    setSelected(null);
    setShowAdvice(false);
  }

  return (
    <div className="app">
      <header>
        <h2>RESPOND</h2>
        <p>Know what to do next.</p>
      </header>

      {!selected ? (
        <section className="home">
          <p className="label">EMERGENCY ASSISTANT</p>
          <h1>What happened?</h1>
          <p className="intro">
            Choose a situation to get simple, step-by-step guidance.
          </p>

          <div className="cards">
            {emergencies.map((item) => (
              <button
                className="card"
                key={item.id}
                onClick={() => chooseEmergency(item.id)}
              >
                <span>{item.icon}</span>
                <strong>{item.name}</strong>
              </button>
            ))}
          </div>

          
        </section>
      ) : (
        <section className="result">
          <button className="back" onClick={reset}>← Back</button>

          <p className="label">GUIDANCE</p>
          <h1>
            {emergencies.find((item) => item.id === selected).name}
          </h1>

          {!showAdvice ? (
            <div className="question">
              <h2>Do you need immediate guidance?</h2>
              <button className="main-button" onClick={() => setShowAdvice(true)}>
                Show Steps
              </button>
            </div>
          ) : (
            <div className="steps">
              <h2>Recommended next steps</h2>
              <ol>
                {advice[selected].map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              <button className="main-button" onClick={reset}>
                Start Again
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
