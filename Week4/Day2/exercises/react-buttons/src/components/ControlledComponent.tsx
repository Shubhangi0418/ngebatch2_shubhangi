import React, { useState } from "react";

function ControlledComponent(){
    const [name, setName]=useState<string>("Guest");
    const handleInput = (e : any)=>{
        setName(e.target.value);
    };

    return (
        <div>
            <input type="text" value={name} onInput={(event : any) => setName(event.target.value)}>
            </input>
            <p style={{ color : name}}>Name is {name}</p>
        </div>
    );

}
export default ControlledComponent