
import './App.css'
import { useState } from 'react';

function App() {


  const [counter , setCounter] = useState(0)
  const addValue = () => {
    if (counter < 5) {
      setCounter((prev) => {
        console.log("value added", prev + 1);
        return prev + 1;
      });
    } else {
      console.log("Maximum value reached");
    }

    
  }

  const removeValue = () => {
    if (counter > 0) {
      setCounter(prev => {
        return prev-1
      })
    }
    else {
      console.log("can not go beyond this");
      
    }
   
    console.log("value removed",counter);
    
  }


  return (
    <>
      <h1>Yukti & React</h1>
      <h2>Counter Value: { counter}</h2>
      <button
      onClick={addValue} 
      
      >Add Value{counter}</button>
      <br />
      <button
      onClick={removeValue}
      >Remove Value {counter}</button>
      <br />
      <p>This is the Value { counter}</p>
    </>
  )
}

export default App


/*
 <button
      onClick={addValue}  passing as a reference so that whenever it get clicks then this function will execute
*/