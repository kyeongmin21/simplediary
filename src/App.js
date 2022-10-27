import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import {useState, useRef} from "react";

function App() {
  const [data, setData] = useState([])
  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    dataId.current += 1
    setData([{author, content, emotion, id: dataId.current}, ...data])
  }

  const onDelete = (targetId) => {
    setData(data.filter(item => item.id !== targetId))
  }

  const onEdit = (targetId, newContent) => {
    setData(data.map(item => item.id === targetId ? {...item, content: newContent} : item))
  }

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onDelete={onDelete} onEdit={onEdit}/>
    </div>
  );
}

export default App;
