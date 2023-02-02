import "./App.css";
import React, { useReducer, useRef, useMemo, useCallback } from "react";

import UserList2 from "./components/UserList2";
import CreateUser from "./components/CreateUser";

const countActiveUsers = (users) => {
  console.log("활성 사용자 수를 세는 중...");
  return users.filter((user) => user.active).length;
  // users 배열에서 active가 true인 새로운 배열을 추출하고, 배열의 길이를 리턴
};

// App에서 사용할 초기 상태를 컴포넌트 바깥으로 분리 (useReducer를 사용하는 목적이 컴포넌트와 상태 업데이트 로직을 분리하는 것이므로..)
const initialState = {
  inputs: {
    username: "",
    email: "",
  },
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
    // action 객체의 type이 'CHANGE_INPUT'일때 실행 (onChange)
    case "CHANGE_INPUT":
      return {
        ...state, // state 객체를 spread 연산자로 펼침
        inputs: {
          // state.inputs 선택
          ...state.inputs, // state.inputs를 spread 연산자로 펼침
          [action.name]: action.value, // action객체의 name을 선택(이름을 입력하면 name: username, 메일주소를 입력할 때는 name: email)해서 action 객체의 value 값을 반영
        },
      };
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
  // initialState 객체를 초기값으로 가지는 state 를 useReducer로 관리하겠다는 선언
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;
  const { username, email } = state.inputs;

  // onChange 함수
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  }, []);

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
    nextId.current += 1;
  }, [username, email]);

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
