import "./App.css";
import React, { useReducer, useRef, useMemo, useCallback } from "react";

import UserList2 from "./components/UserList2";
import CreateUser from "./components/CreateUser";

// 커스텀훅 import
import useInputs from "./hooks/useInputs";

const countActiveUsers = (users) => {
  console.log("활성 사용자 수를 세는 중...");
  return users.filter((user) => user.active).length;
  // users 배열에서 active가 true인 새로운 배열을 추출하고, 배열의 길이를 리턴
};

// App에서 사용할 초기 상태를 컴포넌트 바깥으로 분리 (useReducer를 사용하는 목적이 컴포넌트와 상태 업데이트 로직을 분리하는 것이므로..)
const initialState = {
  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ],
};

// reducer() 함수 생성
function reducer(state, action) {
  switch (action.type) {
    // action 객체의 type이 'CREATE_USER'일때 실행 (onCreate)
    case "CREATE_USER":
      return {
        // inputs 초기화
        inputs: initialState.inputs,
        // users 업데이트
        users: state.users.concat(action.user),
      };
    // action 객체의 type이 'REMOVE_USER'일때 실행 (onRemove)
    case "REMOVE_USER":
      return {
        ...state, // state 객체를 spread 연산자로 펼침
        users: state.users.filter((user) => user.id !== action.id), // users 선택, filter함수를 이용해 아이디값이 전달받은 action.id값(선택한 id값)과 일치하지 않는 users 배열을 리턴
      };
    // action 객체의 type이 'TOGGLE_USER'일때 실행 (onToggle)
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    default:
      return state;
  }
}

function App() {
  // 삭제된 inputs 관련 작업을 대신할 useInputs 생성
  // useInputs에서 반환한 form, onChange, reset을 받아 상태를 업데이트 한다
  const [{ username, email }, onChange, reset] = useInputs({
    username: "",
    email: "",
  });
  // 초기값 {username: "", email: ""} 가 useInputs에 initialForm 객체로 전달된다

  // initialState 객체를 초기값으로 가지는 state 를 useReducer로 관리하겠다는 선언
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;

  // onCreate 함수
  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    reset(); // 새로운 항목을 추가할때 input 값 초기화 (커스텀 Hook useInputs에서 받아옴)
    nextId.current += 1;
  }, [username, email, reset]);

  // onRemove 함수
  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER",
      id,
    });
  }, []);

  // onToggle 함수
  const onToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_USER",
      id,
    });
  }, []);

  // countActiveUsers 함수 실행
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList2 users={users} onRemove={onRemove} onToggle={onToggle} />

      <div>활성 사용자 수 : {count}</div>
    </>
  );
}

export default App;
