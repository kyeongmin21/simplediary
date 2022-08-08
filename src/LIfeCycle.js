import React, {useEffect, useState} from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log('mount')

    return () => {
      console.log('Unmount')
    }
  }, [])

  return (
    <div className="UnmountTest">
        Unmount Testing Component
    </div>
  )
}

const LifeCycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <div className="LifeCycle" style={{padding: 20}}>
      <button onClick={toggle}>On / Off</button>
      { isVisible && <UnmountTest/> }
    </div>
  )
}

export default LifeCycle;