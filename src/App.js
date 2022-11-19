// import './App.css';
// import './App.less';
import {useState} from "react";


function App() {
  const [input, setInput] = useState('');

 const onInput = (e) => {
     setInput(e.target.value);
 }

  return (
    <div className="App">
      <header className="App-header">
        <h1>To Do app for Up product</h1>

          <form action="#">
              <input className={'input'} type="text" onInput={onInput} />
          </form>
      </header>
    </div>
  );
}

export default App;
