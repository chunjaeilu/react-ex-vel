import "./App.css";
import { useState, useRef } from "react";

function App() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });
  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출(input.name 을 name으로 불러올 수 있다)

  const onChange = (e) => {
    const { value, name } = e.target; // e.target 에서 name 과 value 를 추출
    // 여기서 name은 input요소의 name속성 을 의미한다. 변수 name과 혼동하지 말것

    // useState()로 inputs 변수값 변경하기
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value로 설정
    });
  };

  const nameInput = useRef(); // 선택한 DOM요소 ref객체 생성

  // 리셋버튼 클릭시 실행되는 함수
  const onReset = () => {
    // 리셋버튼 클릭시 inputs 값 초기화
    setInputs({
      name: "",
      nickname: "",
    });

    // ref로 선택한 DOM에 포커스 설정
    nameInput.current.focus();
  };

  return (
    <>
      <input
        type="text"
        placeholder="이름"
        onChange={onChange}
        value={name}
        name="name" // name 속성을 부여해 키값을 참조할 수 있도록 한다
        ref={nameInput} // 선택하고싶은 DOM에 ref값 설정
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
