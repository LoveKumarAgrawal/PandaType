import { useState, useEffect } from 'react';
import './App.css';
import { words } from './constants/sentence';

function App() {
  const [time, setTime] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0); // Track the current letter position
  const [typedText, setTypedText] = useState<string>(''); // Store typed text
  const [incorrectLetters, setIncorrectLetters] = useState<Set<number>>(new Set()); // Track incorrect letters
  const [correctLetters, setCorrectLetters] = useState<Set<number>>(new Set()); // Track correct letters

  console.log(typedText);
  
  // Handle key press events
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        // If space is pressed, move the caret to the next word
        setCurrentLetterIndex((prevIndex) => prevIndex + 1);
      } else if (event.key.length === 1) {
        // If a character is typed, check correctness
        const currentLetter = words.join('')[currentLetterIndex]; // Get the current letter in the sentence
        const typedLetter = event.key;

        // Check if the typed letter is correct
        if (currentLetter === typedLetter) {
          setCorrectLetters((prevSet) => new Set(prevSet.add(currentLetterIndex))); // Mark this letter as correct
          setTypedText((prev) => prev + typedLetter); // Append the typed letter to typedText
          setCurrentLetterIndex((prevIndex) => prevIndex + 1); // Move to next letter
        } else {
          // If incorrect, add the letter index to incorrectLetters
          setIncorrectLetters((prevSet) => new Set(prevSet.add(currentLetterIndex)));
          setCurrentLetterIndex((prevIndex) => prevIndex + 1); // Move to next letter
        }
      }
    };

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentLetterIndex]);

  // Calculate the caret position based on the current letter index
  let letterCount = 0;

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
            id="words-container"
            className="flex flex-wrap gap-4 text-4xl justify-center max-w-7xl p-4 leading-10 font-normal tracking-wide relative"
          >
            {words.map((word, wordIndex) => (
              <div key={wordIndex} className="word flex relative">
                {/* Loop through the letters of each word */}
                {word.split('').map((letter, letterIndex) => {
                  const currentLetterPosition = letterCount; // Track the global letter position
                  letterCount++; // Increment after each letter

                  // Check if this letter is the current one (where the caret should be)
                  const isCaret = currentLetterIndex === currentLetterPosition;
                  const isCorrect = correctLetters.has(currentLetterPosition);
                  const isIncorrect = incorrectLetters.has(currentLetterPosition);

                  return (
                    <div key={letterIndex} className="letter relative">
                      {isCaret && (
                        <div className="caret absolute top-0 left-0 w-[2px] h-full bg-white"></div>
                      )}
                      <span
                        className={`${
                          isCorrect ? 'text-white' : isIncorrect ? 'text-red-500' : ''
                        }`}
                      >
                        {letter}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
