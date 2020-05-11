import React, {useState, useEffect, useRef} from 'react';

function App() {
  const DEFAULT_TIME = 120;
  const [text, setText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_TIME);
  const [gameRunning, setGameRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const inputRef = useRef(null);

  useEffect(()=> {
      if(gameRunning && timeRemaining > 0){
        setTimeout(()=> {
          setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000)
      } else if(timeRemaining === 0) {
        endGame();
      }
    
  },[timeRemaining, gameRunning])

  function startGame() {
    setGameRunning(true);
    setTimeRemaining(DEFAULT_TIME);
    setText('');
    setWordCount(0);
    inputRef.current.disabled = false
    inputRef.current.focus()
  }

  function endGame() {
    const count = countWords(text)
    setWordCount(count);
    setGameRunning(false);
    setTimeRemaining(0);
  }

  function handleChange(event) {
    const {value} = event.target;
    setText(value)
  }

  function countWords(text){
    const wordArray = text.split(' ');
    return wordArray.filter(word => word !== '').length;
  }


  return (
    <div>
      <h1>Speed Typing</h1>
      <textarea ref={inputRef} placeholder="Start Typing Here..." onChange={handleChange} value={text} disabled={!gameRunning}/>
      <h4>Time Remaining : {timeRemaining}</h4>
      <button onClick={startGame}  disabled={gameRunning}>{gameRunning ? '....' : 'Start'}</button>
      <h1>Word Count : {wordCount}</h1>
    </div>
  );
}

export default App;
