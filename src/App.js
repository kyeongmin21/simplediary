import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Optimize from "./Optimize";
import OptimizeObj from "./OptimizeObj";
import {useState, useRef, useEffect, useMemo, useCallback} from "react";

function App() {
  const [data, setData] = useState([])
  const dataId = useRef(0);

  const getData = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments')
      .then((res) => res.json());

    const initData = res.slice(0, 3).map((item) => {
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

   const onCreate = useCallback((author, content, emotion) => {
    dataId.current += 1;
    // DOM 노드를 얻기 위해 "current" 프로퍼티에 접근
    setData((data) => [{author, content, emotion, id: dataId.current}, ...data])
  }, []);


  const onDelete = (targetId) => {
    setData(data.filter(item => item.id !== targetId))
  }

  const onEdit = (targetId, newContent) => {
    setData(data.map(item => item.id === targetId ? {...item, content: newContent} : item))
  }

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter(item => item.emotion >= 3).length
    const badCount = data.length - goodCount;
    const goodRatio = ( goodCount / data.length ) * 100;
    return {goodCount, badCount, goodRatio}
  }, [data.length])

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onDelete={onDelete} onEdit={onEdit}/>

      <div>전체일기 : data.length</div>
      <div>기분 좋은 일기 : {goodCount}</div>
      <div>기분 나쁜 일기 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>

    </div>
  );
}

export default App;
