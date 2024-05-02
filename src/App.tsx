import { useEffect, useState } from 'react';
import { MAX_QUIZE, generateQuizzes } from './utils';
import './App.css';
import { Choice, Quize } from './vo/question';
import { LeaderBoard } from './vo/leader-board';
import QuizeBlock from './components/QuizeBlock';

function App() {

  const [quizzes, setQuizzes] = useState<Quize[]>();
  const [score, setScore] = useState<number>(0);
  const [countAnswer, setCountAnswer] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [leaderBoard, setLeaderBoard] = useState<LeaderBoard | null>(null);
  const LEADER_BOARD_KEY = 'LEASER_BOARD_KEY';

  useEffect(() => {
    setQuizzes(generateQuizzes());
    loadLeaderBoard();
  }, [])

  const saveLeaderBoard = () => {
    const leaderBoard: LeaderBoard = {
      score,
      name,
    }
    localStorage.setItem(LEADER_BOARD_KEY, JSON.stringify(leaderBoard));
    setLeaderBoard(leaderBoard);
  }

  const loadLeaderBoard = () => {
    const leaderBoardString: string | null = localStorage.getItem(LEADER_BOARD_KEY)
    if (leaderBoardString) {
      const leaderBoard = JSON.parse(leaderBoardString);
      setLeaderBoard(leaderBoard);
    }
  }

  const handleCallback = (choice: Choice) => {
    setCountAnswer((value) => value + 1);
    if (choice.isAnswer) {
      setScore((value) => value + 1);
    }
  }

  const handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          leaderBoard != null ?
            <div className="App-leader-board">
              Leader Board: {leaderBoard?.name}, Score: {leaderBoard?.score}
            </div>
            :
            null
        }
        <div className="App-current-score">
          Score: {score}
        </div>
      </header>
      <div className="App-container">
        {quizzes?.map((quize, quizeIndex) => <QuizeBlock key={quizeIndex} quize={quize} runNumber={quizeIndex+1} callback={handleCallback} />)}
      </div>
      <footer className="App-footer">
        <input disabled={countAnswer < MAX_QUIZE || score < (leaderBoard?.score || 0)} type="text" onChange={handleNameChange} />
        <button className="App-button-submit" disabled={countAnswer < MAX_QUIZE || score < (leaderBoard?.score || 0)} onClick={saveLeaderBoard}>Submit Score</button>
      </footer>
    </div>
  );
}

export default App;
