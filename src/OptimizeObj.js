import React, {useState, useEffect} from "react";

const CounterA = React.memo(({count}) => {
  useEffect(() => {
    console.log(`count A update ${count}`)
  });
  return <div>{count}</div>
});

const CounterB = ({obj}) => {
  useEffect(() => {
    console.log(`count B update ${obj.count}`)
  });
  return <div>{obj.count}</div>
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.obj.count === nextProps.obj.count;
};

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeObj = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1
  });

  return (
    <div className="OptimizeObj" style={{padding: 20}}>
      <div>
        <h2>Count A</h2>
        <CounterA count={count}/>
        <button onClick={() => setCount(count)}> +</button>
      </div>

      <div>
        <h2>Count B</h2>
        <MemoizedCounterB obj={obj}/>
        <button onClick={() => setObj({count: obj.count})}> +</button>
      </div>
    </div>
  )
}

export default OptimizeObj;
