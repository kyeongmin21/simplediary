import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import {useState, useRef, useEffect} from "react";

function App() {
  const [data, setData] = useState([])
  const dataId = useRef(0);

  const getData = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments')
      .then((res) => res.json());

    const initData = res.slice(0, 20).map((item) => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5 ) + 1,
        id: dataId.current++
      }
    })

    setData(initData);
  }

  // 컴포넌트가 mount 되는 시점에 getData 호출
  useEffect(() => {
    getData();
  }, []);

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
