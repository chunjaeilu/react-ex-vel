import { useState, useCallback } from "react";

export default function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);

  // change
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);
  return <div>useInputs</div>;
}
