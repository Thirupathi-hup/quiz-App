import React, { useState, useEffect, useCallback } from 'react';
import './index.css';

const questions = [
  { question: 'What is the capital of Japan?', options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'], correctAnswer: 'Tokyo' },
  { question: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'], correctAnswer: 'Mars' },
  { question: 'What is the largest mammal in the world?', options: ['Elephant', 'Giraffe', 'Blue Whale', 'Great White Shark'], correctAnswer: 'Blue Whale' },
  { question: "Who wrote 'Romeo and Juliet'?", options: ['Charles Dickens', 'Mark Twain', 'William Shakespeare', 'Jane Austen'], correctAnswer: 'William Shakespeare' },
  { question: 'What is the chemical symbol for water?', options: ['O2', 'H2O', 'CO2', 'NaCl'], correctAnswer: 'H2O' },
];

function shuffleList(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]]; 
  }
  return list;
}

const MultipleChoice = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(10);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('highScore')) || 0);
 
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    restartQuiz(); // Shuffle and start a new quiz on component mount
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (count < quizQuestions.length) {
      const isCorrect = selectedAnswer === quizQuestions[count].correctAnswer;
 
      setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));
      setCount((prevCount) => prevCount + 1);
      setSelectedAnswer(null); // Reset selected answer
      setTimer(10); // Reset timer

      // Check if the quiz is over
      if (count + 1 === quizQuestions.length) {
        const newHighScore = Math.max(score + (isCorrect ? 1 : 0), highScore);
        setHighScore(newHighScore);
        localStorage.setItem('highScore', newHighScore); // Update high score in local storage
        
        //  feedback message based on the score
        if (score >= Math.floor(quizQuestions.length * 0.8)) {
          setFeedback("Well done! You achieved a high score!");
        } else if (score >= Math.floor(quizQuestions.length * 0.5)) {
          setFeedback("Good job! Keep practicing to improve your score.");
        } else {
          setFeedback("Try again! Practice makes perfect.");
        }
      }
    }
  }, [count, highScore, score, selectedAnswer, quizQuestions]);

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
    }
    const countdown = setInterval(() => setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0)), 1000);
    return () => clearInterval(countdown); // Clear interval on unmount or when timer changes
  }, [timer, handleNextQuestion]);

  const handleSubmit = () => {
    handleNextQuestion();
  };

  const handleOptionClick = (option) => {
    setSelectedAnswer(option); // Set selected answer
  };

  const restartQuiz = () => {
    setQuizQuestions(shuffleList([...questions])); // Shuffle and set new questions
    setScore(0);
    setCount(0);
    setSelectedAnswer(null);
    setTimer(10);
 
    setFeedback('');
  };

  return (
    <div>
      <div className='logoContainer'>
      <img src='https://thumbs.dreamstime.com/b/quiz-logo-icon-vector-symbol-flat-cartoon-bubble-speeches-question-check-mark-signs-as-competition-game-interview-160701701.jpg'alt="logo"/>
      <h1 className='HEADING'>QUIZ APP</h1></div>
      <div className="headerContainer">
        <h1>Score: {score}</h1>
        <h1 >High Score: {highScore}</h1>
      </div>

      {count < quizQuestions.length ? (
        <div className="questionContainer">
          <p>{quizQuestions[count].question}</p>
          <ul>
            {quizQuestions[count].options.map((option, index) => (
              <li key={index}>
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="quizOption"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => handleOptionClick(option)}
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </li>
            ))}
          </ul>
          <button type="button" onClick={handleSubmit} disabled={!selectedAnswer}>
            Submit
          </button>
        
          <p>Time remaining: {timer} seconds</p>
        </div>
      ) : (
        <div className="resetContainer">
          <h2>Quiz Completed</h2>
          <p>Your final score is {score}</p>
          <p1>{feedback}</p1>
          <button type="button" onClick={restartQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default MultipleChoice; 