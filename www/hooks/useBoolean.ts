import { useState } from "react";

const useBoolean = (defaultValue?: boolean) => {
  const [value, setValue] = useState(defaultValue ?? false);
  const toggle = () => setValue(prevValue => !prevValue);
  return { value, setValue, toggle };
};

export default useBoolean;
