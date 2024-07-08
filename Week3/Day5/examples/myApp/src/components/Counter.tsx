import { useRef, useState } from "react";

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  // const [value, setValue] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleDecrement = () => setCount(count - 1);
  /* function handleInputChange(e: any) {
    setValue(parseInt(e.target.value));
  } */
  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={handleDecrement}> Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <br />
      <input
        type="number"
        defaultValue={0}
        ref={inputRef}
        /*   onInput={handleInputChange} */
      />
      <button
        onClick={() =>
          setCount(count + parseInt(inputRef?.current?.value || "0"))
        }>
        Add this to count
      </button>
    </>
  );
}
