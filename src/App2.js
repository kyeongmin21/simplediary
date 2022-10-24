import React, {useReducer, useRef, useEffect, useMemo, useCallback} from "react";
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import './App.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT' : {
      return action.data
    }
    case 'CREATE': {
      const create_date = new Date().getTime();
      const newItem = {
        ...action.data,
        create_date
      }
      return [newItem, ...state];
    }
    case 'REMOVE': {
      return state.filter((item) => item.id !== action.targetId)
    }
    case 'EDIT': {
      return state.map((item) =>
        item.id === action.targetId ? {...item, content: action.newContent} : item
      )
    }
    default:
      return state;
  }
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, [])
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
    dispatch({type: 'INIT', data: initData})
  }

  useEffect(() => {
    // API 호출
    getDate();
  }, [])

  // 새로운 일기를 추가하는 함수
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {author, content, emotion, id: dataId.current}
    });
    dataId.current += 1;
  }, []);

  // 삭제하기
  const onRemove = useCallback((targetId) => {
    dispatch({type: 'REMOVE', targetId})
  }, [])

  // 수정하기
  const onEdit = useCallback((targetId, newContent) => {
    dispatch({type: 'EDIT', targetId, newContent})
  }, [])


  const memoizedDispatches = useMemo(() => {
    return {onCreate, onRemove, onEdit}
  }, [])


  // 감정분석
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((item) => item.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100

    return {goodCount, badCount, goodRatio};
  }, [data.length]);

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor/>
          <div>전체 일기 {data.length}</div>
          <div>기분좋은 일기 {goodCount}</div>
          <div>기분나쁜 일기 {badCount}</div>
          <div>기분좋은 일기 비율 {goodRatio}%</div>
          <DiaryList/>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
