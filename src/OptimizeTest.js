import React, {useState, useEffect} from "react";

// 리렌더링 X
const CounterA = React.memo(({count}) => {
  useEffect(() => {
    console.log(`CounterA Update : ${count}`)
  })
  return <div>{count}</div>
});

// 리렌더링 O
// 얕은 비교 : 객체의 주소에 의한 비교
const CounterB = React.memo(({obj}) => {
  useEffect(() => {
    console.log(`CounterB Update : ${obj.count}`)
  })
  return <div>{obj.count}</div>
});

const areEqual = (prevProps, nextProps) => {
  return prevProps.obj.count === nextProps.obj.count
  // return true;  이전 프롭스 = 현재 프롭스가 같다 > 리렌더링 X
  // return false;  이전 포릅스 != 현재 프롭스 > 리렌더링 O
}

// Counter B 컴포넌트는 areEqual 함수에 의해서 리렌더링 될지말지 결정함
// MemoizedCounterB 는 고차함수
const MemoizedCounterB = React.memo(CounterB, areEqual)


const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1
  });

  return (
    <div className="OptimizeTest" style={{padding: 50, textAlign: "center"}}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count}/>
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Count B</h2>
        <MemoizedCounterB obj={obj}/>

        <button onClick={() => setObj({
          count: obj.count
        })}>B button
        </button>
      </div>
    </div>
  )
}

export default OptimizeTest