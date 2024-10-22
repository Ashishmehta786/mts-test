import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { db } from "./firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Label } from "./components/ui/label";
import RadioGroup from "./components/radiogrp";
import Timer from "./components/timer";
const Test = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [extra, setextra] = useState("");
  const [timerStarted, setTimerStarted] = useState(false); // Track if the timer has started
  const [timeUp, setTimeUp] = useState(false); // Track if time is up

  useEffect(() => {
    const fetchQuizData = async () => {
      let arr = [];
      const quizCollection = collection(db, "quizzes");
      const quizSnapshot = await getDocs(quizCollection);
      const quizData = quizSnapshot.docs.map((doc) => doc.data());
      const len = Object.getOwnPropertyNames(quizData[0]).length;
      for (let i = 0; i < len; i++) {
        arr.push(quizData[0][`q${i + 1}`]);
      }
      setQuestions(arr);
    };
    fetchQuizData();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleQuizStart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer("");
    setShowResult(false);
    setTimerStarted(true); // Start the timer
    setTimeUp(false); // Reset time up state
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    setShowResult(true);
  };

  const handleAnswerSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(e.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
    } else {
      const percentile = score / questions.length;
      if (percentile > 0.87) {
        setextra("Excellent! You Qualified the exam");
      }
      setShowResult(true);
    }
  };

  const handleQuizReset = () => {
    handleQuizStart();
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden mx-auto">

      <Card className="w-full max-w-md">
        <CardHeader></CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <p>Loading quiz data...</p>
          ) : !showResult ? (
            <>
              {  !timeUp && (
                <Timer duration={54*10} onTimeUp={handleTimeUp} /> 
              )}
              <div className="mb-4">
                <h2 className="text-lg font-semibold">
                  {currentQuestion?.question}
                </h2>

                <RadioGroup
                  name="ashish"
                  options={currentQuestion?.options}
                  defaultValue={selectedAnswer}
                  onChange={handleAnswerSelect}
                />
              </div>
              <Button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer || timeUp}
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}
              </Button>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold">Revision Complete!</h2>
              <div>{extra}</div>
              <p className="mb-4">
                Your score: {score} / {questions.length}
              </p>
              <Button onClick={handleQuizReset} className="mb-4">
                Retake Quiz
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Test;
