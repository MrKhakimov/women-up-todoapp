import './App.less';
import {AddTask} from "./component/AddTask";
import {Tasks} from "./component/Tasks";

function App() {

  return (
    <div className="App">
      <header className="App-header">

        <div className="container">
            <h1>To Do app for Up product</h1>

            <div className={'row'}>
                <div className={'col-1 mb-2'}>
                    <AddTask />
                </div>
                <div className={'col-3 mb-2'}>
                    <div className={'tasks'}>
                        <h3>Задачи</h3>
                        <Tasks />
                    </div>
                </div>
            </div>
        </div>

      </header>
    </div>
  );
}

export default App;
