// import React, { useState } from "react";
import React, { useReducer } from "react";

// reducer() 함수 생성
function reducer(state, action) {
  switch (action.type) {
    // action객체의 type이 'INCREMENT'이면 state + 1 을 실행
    case 'INCREMENT':
      return state + 1;
    // action객체의 type이 'DECREMENT'이면 state - 1 을 실행
    case 'DECREMENT':
      return state - 1;
    // action이 없을 때는 state를 그대로 반환(현재 상태 유지)
    default:
      return state;
  }
}

export default function Counter() {
  // const [number, setNumber] = useState(0);
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({type:'INCREMENT'});
  };
  const onDecrease = () => {
    dispatch({type:'DECREMENT'});
  };
  return (
    <div>
      <h2>{number}</h2>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}
