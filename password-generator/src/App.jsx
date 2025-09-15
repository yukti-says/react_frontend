import React, { useState , useCallback , useEffect,useRef } from 'react'

const App = () => {
  const [length, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characters, setCharacter] = useState(false);
  const [Password, setPassword] = useState("");
  const [displayText , setText]  = useState(Password)

  //* useRef hook
  const passwordRef = useRef(null);

  //& this function has to be called in the character , length and numberallwoed so this is done through useCallback hook ->creating dependencies
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "012356789";

    if (characters) str += "!@#$%^&*(){}[]?/~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); //?index value aayi h

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characters, setPassword]);

  useEffect(() => {
    passwordGenerator();
     setText(Password);

  }, [length, numberAllowed, characters, passwordGenerator]);

  const copyPasswordToClickBoard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(Password);
    setText("Copied!");
     setTimeout(() => {
    setText(Password);
  }, 1500); 
  }, [Password]);

 

  return (
    <>
      <div className="flex justify-center m-10 p-4">
        <h1 className="font-bold text-3xl text-center bg-slate-600 m-3 p-5 text-white border rounded-xl">
          Generate Password
        </h1>
      </div>

      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3  text-slate-800 bg-slate-200 ">
        <div className="flex shadow rounded-lg overflow-hidden m-4   ">
          <input
            value={displayText}
            className="outline-none w-full py-1 px-3  "
            placeholder="password"
            readOnly
            type="text"
            ref={passwordRef}
          />

          <button
            onClick={copyPasswordToClickBoard}
            className="bg-gray-600 hover:bg-slate-900 text-white font-medium px-4 py-2 ml-2 rounded-md
           transition-transform duration-150 active:scale-95"
          >
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              min={6}
              max={40}
              value={length}
              className="cursor-pointer"
              type="range"
              onChange={(e) => {
                setLenght(e.target.value);
              }}
            />
            <label className="font-medium">Length : {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                //? prev5ious value se reverse value kar do
                setNumberAllowed((prev) => !prev);
              }}
              type="checkbox"
            />
            <label className="font-medium">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              defaultChecked={characters}
              id="numberInput"
              onChange={() => {
                //? previous value se reverse value kar do
                setCharacter((prev) => !prev);
              }}
              type="checkbox"
            />
            <label className="font-medium">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App