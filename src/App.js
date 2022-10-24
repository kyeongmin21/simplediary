import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {id: 1, author: 'min', content: '내용', emotion: 1},
  {id: 2, author: 'jin', content: '내용', emotion: 2},
  {id: 3, author: 'kim', content: '내용', emotion: 3},
]


function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
