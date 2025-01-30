import { useState, useEffect } from 'react';
import './App.css';
import { words } from './constants/sentence';

function App() {
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [correct, setCorrect] = useState(0);

  const handleKeyUp = (event: any) => {
    const key = event.key;
    const currentWord = document.querySelector('.word.current');
    const currentLetter = document.querySelector('.letter.current');
    const expected = currentLetter?.innerHTML || ' ';
    const isLetter = key.length === 1 && key !== ' ';
    const isSpace = key === ' ';
    const isBackspace = key === 'Backspace';
    const isFirstLetter = currentLetter === currentWord?.firstChild;

    if (isLetter) {
      if (currentLetter) {
        addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
        if (key === expected) setCorrect(prev => prev + 1);
        removeClass(currentLetter, 'current');
        if (currentLetter.nextSibling) {
          addClass(currentLetter.nextSibling, 'current');
        }
      } else {
        const incorrectLetter = document.createElement('span');
        incorrectLetter.innerHTML = key;
        incorrectLetter.className = 'letter incorrect extra';
        currentWord?.appendChild(incorrectLetter);
      }
    }

    if (isSpace) {
      if (expected !== ' ') {
        const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
        lettersToInvalidate.forEach((letter) => {
          addClass(letter, 'incorrect');
        });
      }
      removeClass(currentWord, 'current');
      addClass(currentWord?.nextSibling, 'current');
      if (currentLetter) {
        removeClass(currentLetter, 'current');
      }
      addClass(currentWord?.nextSibling?.firstChild, 'current');
    }

    if (isBackspace) {
      if (currentLetter && isFirstLetter) {
        const prevWord = currentWord.previousSibling;
        const prevWordLastLetter = prevWord?.lastChild as HTMLElement;

        if (prevWord && prevWordLastLetter && !prevWordLastLetter.classList.contains('correct')) {
          removeClass(currentWord, 'current');
          addClass(prevWord, 'current');
          removeClass(currentLetter, 'current');
          addClass(prevWordLastLetter, 'current');
          removeClass(prevWordLastLetter, 'incorrect');
          removeClass(prevWordLastLetter, 'correct');
          setCorrect(prev => prev - 1);
        }
      } else if (currentLetter && !isFirstLetter) {
        removeClass(currentLetter, 'current');
        addClass(currentLetter.previousSibling, 'current');
        removeClass(currentLetter.previousSibling, 'incorrect');
        removeClass(currentLetter.previousSibling, 'correct');
        setCorrect(prev => prev - 1);
      } else if (!currentLetter) {
        addClass(currentWord?.lastChild, 'current');
        removeClass(currentWord?.lastChild, 'incorrect');
        removeClass(currentWord?.lastChild, 'correct');
        setCorrect(prev => prev - 1);
      }

      // Handle removal of extra characters when backspace is pressed
      const extraLetter = currentWord?.querySelector('.letter.current.extra');
      console.log(extraLetter)
      if (extraLetter) {
        extraLetter.remove();
      }
    }
  };

  const addClass = (el: any, name: string) => {
    if (el) el.classList.add(name);
  };

  const removeClass = (el: any, name: string) => {
    if (el) el.classList.remove(name);
  };

  useEffect(() => {
    const wordElement = document.querySelector('.word');
    const letterElement = document.querySelector('.letter');
    if (wordElement && !wordElement.classList.contains('current')) {
      addClass(wordElement, 'current');
    }

    if (letterElement && !letterElement.classList.contains('current')) {
      addClass(letterElement, 'current');
    }
  }, []);

  useEffect(() => {
    const handleKeyUpListener = (event: any) => handleKeyUp(event);
    document.addEventListener('keyup', handleKeyUpListener);
    return () => {
      document.removeEventListener('keyup', handleKeyUpListener);
    };
  }, [gameOver]);

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex justify-center items-center mt-2">
          <nav className="flex justify-between items-center w-full max-w-4xl px-4 py-2 bg-[#2c2e31] shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-[#62665e]">PandaType</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setTime(15)}
                className={`py-2 px-4 rounded-lg text-[#62665e] font-semibold ${time === 15 ? 'text-[#e2b71e]' : 'hover:text-white'}`}
              >
                15
              </button>
              <button
                onClick={() => setTime(30)}
                className={`py-2 px-4 rounded-lg text-[#62665e] font-semibold ${time === 30 ? 'text-[#e2b71e]' : 'hover:text-white'}`}
              >
                30
              </button>
            </div>
          </nav>
        </div>

        {/* Typing Area */}
        <div className="flex justify-center items-center h-full text-[#d1d0c5]">
          <div
            id="words"
            className="flex flex-wrap gap-4 text-4xl justify-center max-w-7xl p-4 leading-10 font-normal tracking-wide relative"
          >
            {words.map((word, wordIndex) => (
              <div key={wordIndex} className="word">
                {word.split('').map((letter, letterIndex) => (
                  <span key={letterIndex} className="letter">
                    {letter}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
