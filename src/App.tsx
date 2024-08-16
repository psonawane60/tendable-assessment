import React, { useState, useEffect } from "react";
import { saveScore, getScores } from "./storage";
import { Container, Button, Card } from "react-bootstrap";
import { questions } from "./questions";

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [averageScore, setAverageScore] = useState<number | null>(null);

  useEffect(() => {
    // Set the background for the entire body
    document.body.style.background =
      "radial-gradient(circle, #2c3e50, #000000)";
    document.body.style.margin = "0";
    document.body.style.height = "100vh";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";

    return () => {
      // Clean up the background when the component is unmounted
      document.body.style.background = "";
    };
  }, []);

  useEffect(() => {
    const scores = getScores();
    if (scores.length > 0) {
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      setAverageScore(avgScore);
    }
  }, []);

  const handleAnswer = (answer: boolean) => {
    if (answer) {
      setYesCount(yesCount + 1);
    }
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      const score = (100 * yesCount) / questions.length;
      saveScore(score);
      setShowScore(true);
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 style={{ color: "#ecf0f1", marginBottom: "20px" }}>
        Tendable Coding Assessment
      </h1>
      <Card
        style={{
          width: "30rem",
          padding: "20px",
          borderRadius: "15px",
          zIndex: 3,
          backgroundColor: "#34495e",
          color: "#ecf0f1",
        }}
      >
        <Card.Body>
          {!showScore ? (
            <>
              <Card.Title style={{ fontSize: "1.5rem" }}>
                {questions[currentQuestionIndex].text}
              </Card.Title>
              <div className="mt-4">
                <Button
                  style={{
                    marginRight: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#1abc9c",
                    borderColor: "#1abc9c",
                  }}
                  onClick={() => handleAnswer(true)}
                >
                  Yes
                </Button>
                <Button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#e74c3c",
                    borderColor: "#e74c3c",
                  }}
                  onClick={() => handleAnswer(false)}
                >
                  No
                </Button>
              </div>
            </>
          ) : (
            <>
              <Card.Title style={{ fontSize: "1.5rem" }}>Your Score</Card.Title>
              <p style={{ fontSize: "1.2rem" }}>
                {`You scored ${(100 * yesCount) / questions.length}%`}
              </p>
              {averageScore !== null && (
                <p style={{ fontSize: "1.2rem" }}>
                  {`Average Score: ${averageScore.toFixed(2)}%`}
                </p>
              )}
              <Button
                variant="primary"
                onClick={() => window.location.reload()}
                style={{ padding: "10px 20px" }}
              >
                Try Again
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default App;
