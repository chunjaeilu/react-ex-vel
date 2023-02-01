import React from "react";

// 컴포넌트 함수를 선언함과 동시에 export 하는 경우(rfc) React.memo()로 함수 전체를 감싼다
export default React.memo(({ users, onRemove, onToggle }) => {
  return (
    <>
      {/* <h2>useRef로 컴포넌트 안의 변수 관리하기</h2> */}
      <div>
        {/* User 컴포넌트 불러오기, users 배열 참조하여 props 전달 */}
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            onRemove={onRemove}
            onToggle={onToggle}
          />
        ))}
      </div>
    </>
  );
});

// User 컴포넌트 생성
// 자식의 자식 컴포넌트에 onRemove 전달
// 컴포넌트 내부에 생성한 컴포넌트로, 따로 export 하지 않는 경우에도 React.memo()로 함수 전체를 감싼다
const User = React.memo(({ user, onRemove, onToggle }) => {
  // useEffect(() => {
  //   console.log("user값이 설정됨", user.id);

  //   return () => {
  //     console.log("user 바뀌기 전", user.id);
  //   };
  // }, [user]);
  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
          // user.active가 true이면 color를 'green', false이면 'black' 으로 설정
        }}
        onClick={() => onToggle(user.id)}
        // 사용자가 선택한(마우스를 올린) 유저정보 id를 매개변수로 전달
      >
        {user.username}
      </b>{" "}
      <span>({user.email})</span>
      {/* 컴포넌트에서 매개변수를 요청할 때는 콜백함수를 이용해야 한다 */}
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
});
