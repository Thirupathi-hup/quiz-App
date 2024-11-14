# Quiz App

This is a simple multiple-choice Quiz App built with React for the front end and an Express server for the back end. The app provides randomized questions, tracks scores, and saves the high score locally. It features a timer for each question and provides feedback based on the user’s performance.

## Features

- **Multiple Choice Questions**: The quiz presents randomized multiple-choice questions.
- **Score Tracking**: Tracks the current score and the high score.
- **Timer**: A timer counts down for each question, automatically moving to the next question when time runs out.
- **Feedback**: Provides feedback messages after quiz completion based on the score.
- **Local High Score Storage**: Saves the high score in `localStorage` so that it persists across sessions.


## Screenshots

![Quiz App Screenshot] (https://www.imghippo.com/i/Wb6568tE.png)




## Project Structure

quiz-app/
├── public/
├── src/
│   ├── components/
│   │   └── MultipleChoice.js         # Main quiz component with questions, timer, and score tracking
│   ├── App.js                        # App component that renders MultipleChoice.js
│   ├── index.css                     # CSS file for styling
│   └── index.js                      # Entry point for React DOM rendering
├── package.json                      # Contains dependencies and scripts
└── README.md                         # Project documentation


## Getting Started

Follow the steps below to set up and run the Quiz App locally.

### Prerequisites


- Basic knowledge of frontend technology .

### Installation

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Thirupathi-hup/quiz-App.git


Install dependencies for  the client:
npm install and
npm start
Running the App


Start the front end development server:
npm install and
npm start

The front end will run on http://localhost:3000.


## Technologies Used
React for front-end user interface
CSS for styling
JavaScript for logic and interactivity


## Future Improvements
Add a database for storing questions and high scores permanently.
Add more detailed feedback and different levels of difficulty.
Include additional question types (e.g., true/false, fill in the blank).
