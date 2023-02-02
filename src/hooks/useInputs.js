import { useReducer, useCallback } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "RESET":
      return Object.keys(state).reduce((acc, current) => {
        // Object.keys(state) : state 객체를 배열로 전환
        // reduce((acc, current)=>{}) : 배열의 각 인자(current)에 코드를 실행하고 그 결과로 acc를 기존 배열에 반환하는 함수
        // 이해가 잘 되지 않는다...
        acc[current] = "";
        return acc;
      }, {});
    default:
      return state;
  }
}

export default function useInputs(initialForm) {
  // 여기서 initialForm은 App.js에서 설정한 초기값 {username:"", email:""}을 의미
  const [form, dispatch] = useReducer(reducer, initialForm);
  // change
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  }, []);

  const reset = useCallback(() => {
    // form 초기화
    dispatch({ type: "RESET" });
  }, []); // 더이상 initialForm을 참조하지 않으므로 deps에서 제거해준다

  return [form, onChange, reset];
  // form 객체, onChange()함수, reset()함수를 반환
}
