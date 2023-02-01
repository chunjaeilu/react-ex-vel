// import { useState, useRef } from "react";

export default function UserList2({ users, onRemove, onToggle }) {
  return (
    <>
      <h2>useRef로 컴포넌트 안의 변수 관리하기</h2>
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
}

// User 컴포넌트 생성
// 자식의 자식 컴포넌트에 onRemove 전달
function User({ user, onRemove, onToggle }) {
  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
          // user.active가 true이면 color를 'green', false이면 'black' 으로 설정
        }}
        onMouseOver={() => onToggle(user.id)}
        // 사용자가 선택한(마우스를 올린) 유저정보 id를 매개변수로 전달
      >
        {user.username}
      </b>{" "}
      <span>({user.email})</span>
      {/* 컴포넌트에서 매개변수를 요청할 때는 콜백함수를 이용해야 한다 */}
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}
