// import { useState, useRef } from "react";

// User 컴포넌트 생성
function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

export default function UserList2({ users }) {
  return (
    <>
      <h2>useRef로 컴포넌트 안의 변수 관리하기</h2>
      <div>
        {/* User 컴포넌트 불러오기, users 배열 참조하여 props 전달 */}
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </>
  );
}
