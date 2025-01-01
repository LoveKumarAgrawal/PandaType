import { useState, useEffect } from 'react';
import './App.css';
import { words } from './constants/sentence';

function App() {
  const [time, setTime] = useState(0);

  function addClass(el: Element | null, name: string) {
    if (el) el.classList.add(name);
  }
  
  function removeClass(el: Element | null, name: string) {
    if (el) el.classList.remove(name);
  }

  useEffect(() => {
    const wordElement = document.querySelector(".word");
    const letterElement = document.querySelector(".letter");
    if (wordElement && !wordElement.classList.contains("current")) {
      addClass(wordElement, "current");
    }
  
    if (letterElement && !letterElement.classList.contains("current")) {
      addClass(letterElement, "current");
    }
  }, [])

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
                className={`py-2 px-4 rounded-lg text-[#62665e] font-semibold ${time === 30 ? 'text-[#e2b71e]' : ' hover:text-white'}`}
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
              <div key={wordIndex} className='word'>
                {word.split('').map((letter, letterIndex) => (
                  <span key={letterIndex} className='letter'>{letter}</span>
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
