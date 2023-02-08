import React from "react";

const CreateUser = ({ username, email, onChange, onCreate }) => {
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
