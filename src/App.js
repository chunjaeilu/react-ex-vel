import "./App.css";
import { useState, useRef, useMemo, useCallback } from "react";

import UserList2 from "./components/UserList2";
import CreateUser from "./components/CreateUser";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중...");
  return users.filter((user) => user.active).length;
  // users 배열에서 active가 true인 새로운 배열을 추출하고, 배열의 길이를 리턴
}

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
  ]);

  // Ref로 관리할 변수 생성
  const nextId = useRef(4);

  const onCreate = useCallback(() => {
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
  }, [users, username, email]);

  const onRemove = useCallback(
    (id) => {
      // filter함수를 이용, user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
      // 결과적으로 user.id 가 id 인 것을 제거함
      setUsers(users.filter((user) => user.id !== id));
    },
    [users]
  );

  const onToggle = useCallback(
    (id) => {
      setUsers(
        // map함수는 특정인자를 바꾸고 새로운 배열을 출력한다
        // setUsers 내부에 map함수를 사용하면 결과적으로 바뀐 새로운 배열이 users 변수에 대입된다
        users.map(
          (user) => (user.id === id ? { ...user, active: !user.active } : user)
          // user.id === id ? | users 배열 중 id가 매개변수로 전달받은 id와 일치하면
          // { ...user, active: !user.active } | 해당 user의 active 속성을 현재와 반대로 전환(true >> false, false >> true)시키고
          // : user | 일치하지 않는 user는 그대로 출력함
        )
      );
    },
    [users]
  );

  // const count = countActiveUsers(users);
  // useMemo(()=>{실행코드;},[deps])
  const count = useMemo(() => countActiveUsers(users), [users]);
  // users의 내용이 바뀔 때만 countActiveUsers() 함수를 실행

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
