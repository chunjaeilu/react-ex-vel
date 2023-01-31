import "./App.css";
import { useState, useRef } from "react";

import UserList2 from "./components/UserList2";
import CreateUser from "./components/CreateUser";

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });

  const { username, email } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
    },
  ]);

  // Ref로 관리할 변수 생성
  const nextId = useRef(4);

  const onCreate = () => {
    // 새로운 배열 항목
    const user = {
      id: nextId.current,
      username,
      email,
    };

    // users 배열에 새로운 항목 추가
    setUsers([...users, user]);

    // input 초기화
    setInputs({ username: "", email: "" });

    // 다음에 생성될 항목 id 변경
    nextId.current += 1;
  };

  const onRemove = (id) => {
    // filter함수를 이용, user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // 결과적으로 user.id 가 id 인 것을 제거함
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList2 users={users} onRemove={onRemove} />
    </>
  );
}

export default App;
