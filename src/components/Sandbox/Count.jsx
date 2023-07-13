import * as React from "react";
import { useTestStore } from "store/testStore";

const Count = () => {
  const count = useTestStore((state) => state.count);
  return <div>{count}</div>;
};

export default Count;
