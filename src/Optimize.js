import React, {useState, useEffect} from "react";

const CountView = React.memo(({count}) => {
  useEffect(() => {
    console.log(`count: ${count}`)
  });
  return <div>{count}</div>
});

const TextView = React.memo(({text}) => {
  useEffect(() => {
    console.log(`text: ${text}`)
  });
  return <div>{text}</div>
});

const Optimize = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState('');

  return (
    <div className="Optimize" style={{padding: 20}} >
      <div>
        <h2>Count</h2>
        <CountView count={count}/>
        <button value={count} onClick={() => setCount(count + 1)}> + </button>
      </div>
      <div>
        <h2>Text</h2>
        <TextView text={text}/>
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
      </div>
    </div>
  )
}

export default Optimize;
