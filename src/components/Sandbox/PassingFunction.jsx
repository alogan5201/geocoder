import {useState} from "react";

const Child = ({ handleClick }) => {
  return <button onClick={handleClick}>Apply</button>;
};

const Parent = () => {
const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count + 1)
  };

  return (
    <>
      <h1 style={{marginRight:"5px"}}>Count: {count}</h1>
      <Child handleClick={handleClick} />
    </>
  );
};


export default function PassingFunction(){
  return <Parent />
}