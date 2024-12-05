import React, { useState, useEffect } from "react";
import './index.css';

function RiddleApp() {
  const [riddleAnswer, setRiddleAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const fetchRiddle = async () => {
    setShowAnswer(false);
    try {
      const response = await fetch("https://riddles-api.vercel.app/random");
      const data = await response.json();
      setRiddleAnswer(data);
    } catch (error) {
      console.error("Error fetching riddle:", error);
    }
  };

  useEffect(() => {
    fetchRiddle();
  }, []);

  if (!riddleAnswer) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <header>
        <h1>Riddle App</h1>
      </header>
      <main>
        <p><strong>Riddle:</strong> {riddleAnswer.riddle}</p>
        {showAnswer ? (
          <>
            <p><strong>Answer:</strong> {riddleAnswer.answer}</p>
            <button onClick={() => fetchRiddle()} style={{ margin: "10px" }}>
              Right
            </button>
            <button onClick={() => fetchRiddle()} style={{ margin: "10px" }}>
              Wrong
            </button>
          </>
        ) : (
          <button onClick={() => setShowAnswer(true)}>Reveal Answer</button>
        )}
      </main>
      <footer>
        <p> we used a riddle api 
        </p>
      </footer>
    </>
  );
}

export default RiddleApp;
