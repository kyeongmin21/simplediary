import React, {useState, useRef, useEffect, useMemo, useCallback} from "react";
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import './App.css';



export const DiaryStateContext = React.createContext()


function App() {
  // 일기가 없는 상태니깐 빈 배열로 출발!
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const getDate = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments')
      .then((res) => res.json());
    const initData = res.slice(0, 20).map((item) => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++
      }
    });

    setData(initData)
  }

  useEffect(() => {
    // API 호출
    getDate();
  }, [])

  // 새로운 일기를 추가하는 함수
  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime()
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    };
    dataId.current += 1;
    // 새 일기를 쓸 때 마다 맨위로 오게하기 위해, newItem을 먼저 씀!
    setData((data) => [newItem, ...data])
  }, []);

  // 삭제하기
  const onRemove = useCallback((targetId) => {
    setData(data => data.filter((item) => item.id !== targetId))
  }, []);

  // 수정하기
  const onEdit = useCallback((targetId, newContent) => {
    setData(data.map(data =>
      (item) =>
      item.id === targetId ? {...data, content: newContent} : item
    ))
  }, [])

  // 감정분석
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((item) => item.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100

    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const  { goodCount, badCount, goodRatio } = getDiaryAnalysis

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <div>전체 일기 {data.length}</div>
      <div>기분좋은 일기 {goodCount}</div>
      <div>기분나쁜 일기 {badCount}</div>
      <div>기분좋은 일기 비율 {goodRatio}%</div>
      <DiaryList onRemove={onRemove} diaryList={data} onEdit={onEdit}/>
    </div>
  );
}

export default App;
