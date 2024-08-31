import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const copyToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard?.writeText(password);
  },[password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (charAllowed) str += "~!@#$%^&*()_+{}[]|/;',.><";
    if (numAllowed) str += "0123456789";
    for (let i = 1; i <= length; i++) {
      const idx = Math.floor(Math.random() * str.length + 1);
      pass += str[idx];
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(()=>{
    passwordGenerator();
  },[length,charAllowed,numAllowed,passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-8 my-8 text-orange-800 bg-gray-700">
        <h1 className="text-center m-1 p-2 text-4xl text-white">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 gap-0">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 my-5 rounded-l-lg"
            placeholder="Password"
            onChange={()=>setPassword(passwordGenerator())}
            ref={passwordRef}
            readOnly
          />

          <button 
          className="bg-blue-700 outline-none py-1 px-3 m-5 rounded-r-lg mx-0 text-white hover:bg-blue-900"
          onClick={copyToClipBoard}
          >
            Copy
          </button>
        </div>

        <div className="flex gap-4">
          <div>
            <input
             type="range" 
             min={6}
             max={100}
             value={length}
             onChange={(e)=>setLength(e.target.value)}
             className="cursor-pointer"
             />
            <span className="mx-1 text-white">length :{length}</span>
          </div>
          <div>
            <input
             type="checkbox"
             defaultChecked = {numAllowed}
             id="numberInput"
             onChange={(e)=>setNumAllowed((prev)=>!prev)}
             />
            <span className="text-white mx-1">Number</span>
          </div>
          <div>
            <input
             type="checkbox"
             defaultChecked = {charAllowed}
             id="charInput"
             onChange={(e)=>setCharAllowed((prev)=>!prev)}
             />
            <span className="text-white mx-1">Character</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
