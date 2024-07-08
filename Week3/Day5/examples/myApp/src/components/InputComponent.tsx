import { useState } from "react";

const InputComponent = () => {
  const [name, setName] = useState("");
  const errormsg = "Username cannot be empty";
  const handleChange = (e: any) => {
    setName(e.target.value);
  };
  return (
    <div>
      <label>Enter Username</label>
      <input type="text" value={name} onChange={handleChange} />
      <p> {name == "" ? errormsg : `Hello ${name}`}</p>
    </div>
  );
};

export default InputComponent;
