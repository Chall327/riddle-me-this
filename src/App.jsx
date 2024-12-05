import React, { useState, useEffect } from "react";
import {useAuthentication} from "../authService";
import Header from "./Header.jsx"
import './index.css';

function RiddleApp() {
  const [riddleAnswer, setRiddleAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const user = useAuthentication();

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

  function startOver() {

  }

  useEffect(() => {
    fetchRiddle();
  }, []);

  if (!riddleAnswer) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <Header action={startOver} user={user} />      
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
        <p> Uses Riddle API
        </p>
      </footer>
    </>
  );
}
 
export default RiddleApp;
