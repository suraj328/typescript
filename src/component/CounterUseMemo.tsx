import React, { useState, useMemo } from "react";

const CounterUseMemo: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [num, setNum] = useState<number>(5);

  const isEven: boolean = useMemo(() => {
    console.log("Recalculating isEven");
    return count % 2 === 0;
  }, [count, num]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Threshold: {num}</p>
      <p>{isEven ? "Even" : "Odd"}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setNum(num + 1)}>Increase Num</button>
    </div>
  );
};

export default CounterUseMemo;
