import { useState } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);

  return (
    <>
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
    

    </>
  );
}

export default App;
