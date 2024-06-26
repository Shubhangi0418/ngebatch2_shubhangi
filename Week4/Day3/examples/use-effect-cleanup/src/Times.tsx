import React, { useEffect, useState } from "react";

function Times() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
      console.log(id); //unique and called only once as we have Useeffect , callback is called mulitple times
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div>
      <h3>Time now is {time.toLocaleTimeString()}</h3>
    </div>
  );
}

export default Times;
