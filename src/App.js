import "./App.css";
import { useState } from "react";

function App() {
  const [inputs, setInputs] = useState({
    name: "이름",
    nickname: "닉네임",
  });
  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출
  console.log(name, nickname);
  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    console.log(e.target);
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value로 설정
    });
  };
  const onReset = () => {};

  return (
    <>
      <input
        type="text"
        placeholder="이름"
        onChange={onChange}
        value={name}
        name="name"
      />
      <input
        type="text"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
        name="nickname"
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값:</b>
        {name}({nickname})
      </div>
    </>
  );
}

export default App;
