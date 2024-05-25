import { useCallback, useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  //useRef hook
  const passwordRef = useRef(null)
  const copyRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    copyRef.current.innerHTML = "copy"
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyx";

    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()=[]{}`~-";

    for (let i = 1; i < length; i++) {
      let charIdx = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charIdx);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    //change the copy button text to copied 
  copyRef.current.innerHTML = "copied"
  },[password])

  useEffect(()=> {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed, passwordGenerator])



  return (
    <>
      <div className="text-center mx-auto max-w-md shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 "> 
        <h1 className="text-3xl font-bold text-gray-100">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 mt-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          ref={copyRef}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e)=>{ setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>

          {/* for NUMBERS allowed or not */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked = {numberAllowed}
              id="numberInput"
              onChange={()=>{
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          {/* for CHARACTERS allowed or not */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked = {charAllowed}
              id="characterInput"
              onChange={()=>{
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
