import "./App.css";
import React, { useReducer, useMemo } from "react";

import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";
import produce from "immer";

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
      return produce(state, (draft) => {
        // users 업데이트
        draft.users.push(action.user);
      });
    // action 객체의 type이 'REMOVE_USER'일때 실행 (onRemove)
    case "REMOVE_USER":
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    // action 객체의 type이 'TOGGLE_USER'일때 실행 (onToggle)
    case "TOGGLE_USER":
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });
    default:
      return state;
  }
}

// UserDispatch 라는 Context 생성 및 내보내기
// React.createContext(기본값) : Context 생성 함수
export const UserDispatch = React.createContext(null);

function App() {
  // initialState 객체를 초기값으로 가지는 state 를 useReducer로 관리하겠다는 선언
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  // countActiveUsers 함수 실행
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    // 생성된 Context(UserDispatch) 내부에 생성되는 Provider 컴포넌트를 통해서 Context 값을 지정할 수 있다.
    // value 값을 설정하면 Provider로 감싸진 모든 컴포넌트에서 언제든지 Context 값(여기서는 dispatch)을 꺼내 쓸 수 있게 된다.
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />

      <div>활성 사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
