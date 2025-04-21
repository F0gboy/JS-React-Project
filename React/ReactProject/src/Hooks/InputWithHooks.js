import React, { useState } from "react";

function InputWithHooks(props) {
  const [value, setValue] = useState("");

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <>
      <input value={value} onChange={handleChange} />
      <p>You wrote: {value}</p>
    </>
  );
}

export default InputWithHooks;