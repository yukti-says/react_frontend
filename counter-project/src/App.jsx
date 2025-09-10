
import './App.css'
import { useState } from 'react';

function App() {


  const [counter , setCounter] = useState(0)
  const addValue = () => {
    setCounter(counter +1)
    console.log("value added",counter);
    
  }

  const removeValue = () => {
    if (counter === 0) {
      console.log("can not do this");
    
      
    }
   setCounter(counter-1)
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