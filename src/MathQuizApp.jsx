import React, { useState, useEffect, useRef } from 'react';
import { Play, Home, RotateCcw, Clock } from 'lucide-react';

const MathQuizApp = () => {
  // All questions from the Excel file
  const allQuestions = [
    { Question: "What is three hundred and forty-five minus three hundred and five?", Answer: "40" },
    { Question: "What is the largest positive integer factor of twenty-four minus the smallest positive integer factor of twenty-four?", Answer: "23" },
    { Question: "What is the area in square meters of a triangle with a height of two meters and a base of four meters?", Answer: "4" },
    { Question: "If Sasha has fifteen dimes and Olivia has three quarters, how many cents do they have in total?", Answer: "225" },
    { Question: "x minus fourteen equals ten. What is x?", Answer: "24" },
    { Question: "The first six Fibonacci numbers are zero, one, one, two, three, and five. What is the average of the first six Fibonacci numbers?", Answer: "2" },
    { Question: "The product of two numbers is one hundred and twelve, and four times the first number is sixty-four. What is the second number?", Answer: "7" },
    { Question: "If one machine can make one hundred pencils every thirty minutes, how many hours will it take two machines to make two thousand pencils?", Answer: "5" },
    { Question: "In square inches, what is the area of a right triangle with leg lengths three and eight inches?", Answer: "12" },
    { Question: "What is the perimeter in centimeters of a rectangle with a length of seven centimeters and a width of three centimeters?", Answer: "20" },
    { Question: "What is the sum of the first four positive odd numbers?", Answer: "16" },
    { Question: "If a circle has a radius of five units, what is its diameter?", Answer: "10" },
    { Question: "What is fifteen percent of two hundred?", Answer: "30" },
    { Question: "How many sides does a hexagon have?", Answer: "6" },
    { Question: "What is the square root of sixty-four?", Answer: "8" },
    { Question: "If you have three dozen eggs, how many eggs do you have in total?", Answer: "36" }
  ];

  const [currentScreen, setCurrentScreen] = useState('menu');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(20);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [isRetryMode, setIsRetryMode] = useState(false);
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  // Text-to-speech function
  const speakText = (text, onComplete = null) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.6;  // Even slower, very gentle pace
      utterance.pitch = 0.7; // Much lower pitch for very soft tone
      utterance.volume = 1.0; // Back to full volume
      
      // Try to select a female voice
      const voices = speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('woman') ||
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('susan') ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.gender === 'female'
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      if (onComplete) {
        utterance.onend = onComplete;
      }
      speechSynthesis.speak(utterance);
    } else if (onComplete) {
      // If speech synthesis is not available, start timer immediately
      setTimeout(onComplete, 1000);
    }
  };

  // Timer effect
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, isTimerRunning]);

  // Select random questions based on chosen number
  const selectRandomQuestions = (questionsPool = allQuestions) => {
    const numQuestions = numberOfQuestions || 5; // Default to 5 if empty
    const shuffled = [...questionsPool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(numQuestions, questionsPool.length));
  };

  const startQuiz = (retryQuestions = null) => {
    const questions = retryQuestions || selectRandomQuestions();
    setSelectedQuestions(questions);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setCurrentAnswer('');
    setTimeLeft(20);
    setCurrentScreen('quiz');
    setIsTimerRunning(false); // Don't start timer yet
    
    // Speak the first question and start timer when complete
    setTimeout(() => {
      speakText(questions[0].Question, () => {
        setIsTimerRunning(true);
      });
    }, 500);
  };

  const handleAnswerChange = (value) => {
    setCurrentAnswer(value);
  };

  const handleSubmit = () => {
    // Stop any ongoing speech when submitting
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    // Save current answer
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = currentAnswer;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < selectedQuestions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer('');
      setTimeLeft(20);
      setIsTimerRunning(false); // Stop timer until speech is complete
      
      // Speak next question and start timer when complete
      setTimeout(() => {
        speakText(selectedQuestions[currentQuestionIndex + 1].Question, () => {
          setIsTimerRunning(true);
        });
      }, 500);
    } else {
      // Quiz finished
      finishQuiz(newAnswers);
    }
  };

  const finishQuiz = (answers) => {
    setIsTimerRunning(false);
    
    // Stop any ongoing speech
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    
    let correctCount = 0;
    const incorrect = [];
    const allResults = [];
    
    selectedQuestions.forEach((question, index) => {
      const userAnswer = answers[index] || '';
      const isCorrect = userAnswer.trim().toLowerCase() === question.Answer.toLowerCase();
      
      const result = {
        question: question.Question,
        correctAnswer: question.Answer,
        userAnswer: userAnswer || 'No answer',
        isCorrect: isCorrect,
        originalQuestion: question
      };
      
      allResults.push(result);
      
      if (isCorrect) {
        correctCount++;
      } else {
        incorrect.push(result);
      }
    });

    setQuizResults({
      correct: correctCount,
      total: selectedQuestions.length,
      incorrect: incorrect,
      allResults: allResults
    });
    setIncorrectQuestions(incorrect);
    setCurrentScreen('results');
  };

  const retryIncorrectQuestions = () => {
    setIsRetryMode(true);
    const questionsToRetry = incorrectQuestions.map(item => item.originalQuestion);
    startQuiz(questionsToRetry);
  };

  const goToMainMenu = () => {
    setCurrentScreen('menu');
    setIsTimerRunning(false);
    setIsRetryMode(false);
    setQuizResults(null);
    setIncorrectQuestions([]);
    clearTimeout(timerRef.current);
  };

  // Focus input when question changes
  useEffect(() => {
    if (currentScreen === 'quiz' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestionIndex, currentScreen]);

  if (currentScreen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-10 text-center max-w-lg w-full border border-gray-200">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Mental Math Quiz
            </h1>
            <div className="h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto w-24"></div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8 border-l-4 border-blue-500">
            <p className="text-gray-700 font-medium mb-2">
              Test your mental math skills with timed questions
            </p>
            <p className="text-sm text-gray-600">
              Each question has a 20-second timer and will be read aloud
            </p>
          </div>
          
          {/* Number of Questions Input */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Choose the Number of Questions
            </label>
            <div className="mb-4">
              <input
                type="number"
                min="1"
                max="16"
                value={numberOfQuestions}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '') {
                    setNumberOfQuestions('');
                  } else {
                    const numValue = parseInt(value);
                    if (!isNaN(numValue)) {
                      setNumberOfQuestions(Math.min(Math.max(numValue, 1), 16));
                    }
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === '' || parseInt(e.target.value) < 1) {
                    setNumberOfQuestions(1);
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    startQuiz();
                  }
                }}
                className="w-32 p-3 text-xl font-semibold text-center border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                placeholder="5"
              />
            </div>
            <p className="text-sm text-gray-500">
              Available range: 1-16 questions (Total questions in database: 16)
            </p>
          </div>
          
          <button
            onClick={() => startQuiz()}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-3 w-full text-lg"
          >
            <Play size={20} />
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (currentScreen === 'quiz') {
    const progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-700">
                  Question {currentQuestionIndex + 1} of {selectedQuestions.length}
                </span>
                {isRetryMode && <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Retry Mode</span>}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} className={timeLeft <= 5 ? 'text-red-500' : 'text-gray-500'} />
                <span className={`text-xl font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-gray-700'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Area */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                🎧 Listen to the Question
              </h2>
              <p className="text-gray-600">
                {isTimerRunning ? "Answer the question you heard" : "Listening..."}
              </p>
            </div>
            
            <div className="space-y-4">
              <input
                ref={inputRef}
                type="text"
                value={currentAnswer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Enter your answer..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex-1"
                >
                  Submit Answer
                </button>
                <button
                  onClick={goToMainMenu}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Home size={16} />
                  Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'results') {
    const percentage = Math.round((quizResults.correct / quizResults.total) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Results Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {isRetryMode ? '🔄 Retry Results' : '🎉 Quiz Complete!'}
            </h1>
            
            <div className="text-6xl font-bold mb-4">
              <span className="text-green-500">{quizResults.correct}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{quizResults.total}</span>
            </div>
            
            <p className="text-xl text-gray-600 mb-2">
              You got {quizResults.correct} out of {quizResults.total} questions correct!
            </p>
            <p className="text-lg text-gray-500">
              That's {percentage}%
            </p>
          </div>

          {/* All Questions Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📋 Complete Question Summary
            </h2>
            <div className="space-y-4">
              {quizResults.allResults.map((result, index) => (
                <div key={index} className={`border rounded-lg p-4 ${
                  result.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {result.isCorrect ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">✗</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 mb-2">
                        <strong>Q{index + 1}:</strong> {result.question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <p className={result.isCorrect ? 'text-green-700' : 'text-red-600'}>
                          <strong>Your answer:</strong> {result.userAnswer}
                        </p>
                        <p className="text-green-700">
                          <strong>Correct answer:</strong> {result.correctAnswer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Incorrect Questions (if any) */}
          {quizResults.incorrect.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-red-600 mb-4">
                ❌ Questions to Review:
              </h2>
              <p className="text-gray-600 mb-4">
                Focus on these {quizResults.incorrect.length} questions for improvement:
              </p>
              <div className="space-y-3">
                {quizResults.incorrect.map((item, index) => (
                  <div key={index} className="border border-red-200 rounded-lg p-3 bg-red-50">
                    <p className="font-medium text-gray-800 text-sm">
                      {item.question}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-3">
              <button
                onClick={goToMainMenu}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Home size={20} />
                Back to Main Menu
              </button>
              
              {quizResults.incorrect.length > 0 && (
                <button
                  onClick={retryIncorrectQuestions}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={20} />
                  Retry Incorrect Questions ({quizResults.incorrect.length})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MathQuizApp;