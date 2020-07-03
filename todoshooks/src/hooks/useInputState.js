import { useState } from "react";

export default (initialVal) => {
  const [value, setValue] = useState(initialVal);
  const handleChage = (e) => {
    setValue(e.target.value);
  };
  const reset = () => setValue("");
  return [value, handleChage, reset];
};
