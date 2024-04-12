import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import React, {useRef, useEffect, useMemo, useCallback, useReducer} from "react";

// 복잡한 상태변화 로직을 컴포넌트 밖으로 분리하기 위해서
const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT' : {
      return action.data
    }
    case 'CREATE': {
      const newItem = {...action.data}
      return [newItem, ...state]
    }
    case 'DELETE': {
      return state.filter(item => item.id !== action.targetId)
    }
    case 'EDIT': {
      return state.map(item => item.id === action.targetId
        ? {...item, content: action.newContent}
        : item)
    }
    default:
      return state
  }
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();


function App() {
  const dataId = useRef(0);
  const [data, dispatch] = useReducer(reducer, []);

  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments')
      .then((res) => res.json());

    const initData = res.slice(0, 3).map((item) => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        id: dataId.current++
      }
    })
    dispatch({type: 'INIT', data: initData})
  }

  // 컴포넌트가 mount 되는 시점에 getData 호출
  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({type: 'CREATE', data: {author, content, emotion, id: dataId.current}})
    // DOM 노드를 얻기 위해 "current" 프로퍼티에 접근
    dataId.current += 1;
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({type: 'DELETE', targetId})
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({type: 'EDIT', targetId, newContent})
  }, []);

  const memoizedDispatched = useMemo(() => {
    return {onCreate, onDelete, onEdit}
  }, [])

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter(item => item.emotion >= 3).length
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio}
  }, [data.length])

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={memoizedDispatched}>
          <DiaryEditor onCreate={onCreate}/>
          <DiaryList onDelete={onDelete} onEdit={onEdit}/>

          <div>전체일기 : data.length </div>
          <div>기분 좋은 일기 : {goodCount}</div>
          <div>기분 나쁜 일기 : {badCount}</div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </div>
  );
}

export default App;
