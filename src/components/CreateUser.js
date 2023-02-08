import React, { useContext, useRef } from "react";
import useInputs from "../hooks/useInputs";
import { UserDispatch } from "../App";

const CreateUser = () => {
  // 삭제된 inputs 관련 작업을 대신할 useInputs 생성
  // useInputs에서 반환한 form, onChange, reset을 받아 상태를 업데이트 한다
  const [{ username, email }, onChange, reset] = useInputs({
    username: "",
    email: "",
  });
  // 초기값 {username: "", email: ""} 가 useInputs에 initialForm 객체로 전달된다

  const nextId = useRef(4);

  const dispatch = useContext(UserDispatch);

  // onCreate 함수
  const onCreate = () => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    reset();
    nextId.current += 1;
  };

  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
};

// 컴포넌트 함수를 만들고 따로 export 하는 경우(rfce) 컴포넌트 이름을 React.memo()로 감싸는 방식
export default React.memo(CreateUser);
