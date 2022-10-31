import React, {useEffect, useState} from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log('Mount')

    return () => {
      console.log('Unmount')
    }
  }, []);

  return (
    <div className="UnmountTest">
      <div>Unmount Testing Component</div>
    </div>
  )
}

const LifeCycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <div className="LifeCycle" style={{padding: 20}}>
      <button onClick={toggle}>ON / OFF</button>
      단락회로평가에 의해 isVisible이 true 면 뒤의 컴포넌트가 나오게 됨
      { isVisible && <UnmountTest /> }
    </div>
  )
}


const LifeCycleTest = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('mount')
  }, []);

  useEffect(() => {
    console.log('update')
  });

  useEffect(() => {
    console.log(`count update ${count}`)
  }, [count]);

  return (
    <div className="LifeCycle" style={{padding: 20}}>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>UP</button>
      </div>
      <div>
        <input type="text"
               value={text}
               onChange={(e) => setText(e.target.value)}/>
      </div>
    </div>
  )
}

export default LifeCycle;
