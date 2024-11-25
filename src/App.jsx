import { useState, useEffect } from 'react';
import Button from './components/Button';
import numbers from './numbers.json';
import Display from './components/Display';

function App() {
  function parseExpression(expression) {
    const tokens = expression.split(/([+\-*/])/).map((token) => {
      return isNaN(token) ? token : parseFloat(token);
    });
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === '*' || tokens[i] === '/') {
        const operator = tokens[i];
        const left = tokens[i - 1];
        const right = tokens[i + 1];

        if (operator === '/' && right === 0) {
          throw new Error("Cannot divide by zero");
        }

        const result = operator === '*' ? left * right : left / right;
        tokens.splice(i - 1, 3, result);
        i -= 1;
      }
    }

    // Handling addition (+) and subtraction (-)
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === '+' || tokens[i] === '-') {
        const operator = tokens[i];
        const left = tokens[i - 1];
        const right = tokens[i + 1];
        const result = operator === '+' ? left + right : left - right;
        tokens.splice(i - 1, 3, result);
        i -= 1;
      }
    }

    return tokens[0];
  }

  const [display, setDisplay] = useState('');
  const [result, setResult] = useState(false);

  const handleButtonClick = (input) => {
    if (input === 'C') {
      setDisplay('0');
      setResult(false);  
    } else if (input === '=') {
      setDisplay(parseExpression(display));
      setResult(true);  
    } else {
      if (result) {
        setDisplay(input);
        setResult(false); 
      } else {
        setDisplay((prevDisplay) => prevDisplay + input);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key >= '0' && event.key <= '9') {
      handleButtonClick(event.key);
    } else if (event.key === 'Enter') {
      handleButtonClick('=');
    } else if (event.key === 'Backspace') {
      handleButtonClick('C');
    } else if (['+', '-', '*', '/'].includes(event.key)) {
      handleButtonClick(event.key);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display, result]);

  return (
    <>
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-72">
        <Display display={display} />
        <div className="grid grid-cols-4 gap-4 mt-6">
        {numbers.map((number) => (
  <Button
    key={number.id}
    number={number.number}
    onClick={() => handleButtonClick(number.number)}
    isAction={number.isAction}
    isEquals={number.isEquals}
    isClear={number.isClear}
  />
))}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
