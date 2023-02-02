import { useState, useCallback } from "react";

export default function useInputs(initialForm) {
  // 여기서 initialForm은 App.js에서 설정한 초기값 {username:"", email:""}을 의미
  const [form, setForm] = useState(initialForm);

  // change
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
    // input에 값을 입력하면 form 변수에 {username:"이름", email:"메일주소"} 형태로 저장된다.
  }, []);

  const reset = useCallback(() => {
    // form 초기화
    setForm(initialForm);
  }, [initialForm]);

  return [form, onChange, reset];
  // form 객체, onChange()함수, reset()함수를 반환
}
