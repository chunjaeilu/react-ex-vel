import React, { useContext } from "react";
// App.js에서 내보낸 UserDispatch Context import
import { UserDispatch } from "../App";

// 컴포넌트 함수를 선언함과 동시에 export 하는 경우(rfc) React.memo()로 함수 전체를 감싼다
export default React.memo(({ users }) => {
  return (
    <>
      {/* <h2>useRef로 컴포넌트 안의 변수 관리하기</h2> */}
      <div>
        {/* User 컴포넌트 불러오기, users 배열 참조하여 props 전달 */}
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </>
  );
});

// User 컴포넌트 생성
// 자식의 자식 컴포넌트에 onRemove 전달
// 컴포넌트 내부에 생성한 컴포넌트로, 따로 export 하지 않는 경우에도 React.memo()로 함수 전체를 감싼다
const User = React.memo(({ user }) => {
  const dispatch = useContext(UserDispatch);

  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
          // user.active가 true이면 color를 'green', false이면 'black' 으로 설정
        }}
        onClick={() => {
          dispatch({ type: "TOGGLE_USER", id: user.id });
        }}
        // type: "TOGGLE_USER", id: use.id인 action 객체 생성 (dispatch)
        // useReducer로 관리하는 state에 action 객체를 전달하고, 해당 로직을 실행시킨다
      >
        {user.username}
      </b>{" "}
      <span>({user.email})</span>
      {/* 컴포넌트에서 매개변수를 요청할 때는 콜백함수를 이용해야 한다 */}
      <button
        onClick={() => {
          dispatch({ type: "REMOVE_USER", id: user.id });
        }}
      >
        삭제
      </button>
    </div>
  );
});
