# 리액트 실습 노트
벨로퍼트의 React 강의를 따라가면서 실습한 내용을 날짜별로 기록한다

앞선 기초문법은 선행하였으므로 09강부터 기록

## 23.01.31(화)

### 여러개의 input 상태관리
> Inputs.js
>
> 이름과 닉네임을 입력하는 input 요소 상태관리

- input 요소가 여러개일 때 단순히 `useState`를 여러번 사용하고 `onChange`도 여러개 만들어서 관리 할 수도 있지만 추천하는 방식은 아님
- input 요소에 `name`속성을 설정하고 name 값을 참조하는 방법을 추천함
  <details>
    <summary>코드</summary>

  ```javascript
  return (
    <>
      <input
        type="text"
        placeholder="이름"
        onChange={onChange}
        value={name}
        name="name" // name 속성을 부여해 키값을 참조할 수 있도록 한다
      />
      <input
        type="text"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
        name="nickname"
      />
    </>
  );
  ```

  </details>

- `useState`에서는 문자열이 아닌 객체 형태로 상태를 관리한다
  <details>
    <summary>코드</summary>

  ```javascript
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  }); // inputs 변수 useState 선언 및 초기값 설정
  
  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출(input.name 을 name으로 불러올 수 있다)
  const onChange = (e) => {
    const { value, name } = e.target; // e.target 에서 name 과 value 를 추출
    // 여기서 name은 input요소의 name속성 을 의미한다. 변수 name과 혼동하지 말것
    // useState()로 inputs 변수값 변경하기
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value로 설정
    });
  };
  ```
  </details>
  
### useRef로 DOM 선택하기
> Inputs.js
>
> useRef로 초기화버튼 클릭시 input에 포커스 설정하기

- vaScript에서는 DOM을 선택할 때 `querySelector`나 `getElementById` 등을 사용하지만 리액트에서 DOM을 선택할 때는 `useRef`Hook을 사용한다.
- Ref객체의 `.current` 로 선택한 DOM을 받는다.
- 선택하고싶은 DOM에 ref값을 설정하고 `ref={nameInput}`
- 선택한 DOM요소의 ref 객체를 생성한 뒤 `const nameInput = useRef();`
- ref객체명.current 를 이용해 객체를 조작한다 `nameInput.current.focus();`

  <details>
    <summary>코드</summary>

  ```javascript
  ...
  const nameInput = useRef(); // 선택한 DOM요소 ref객체 생성

  // 리셋버튼 클릭시 실행되는 함수
  const onReset = () => {
    // 리셋버튼 클릭시 inputs 값 초기화
    setInputs({
      name: "",
      nickname: "",
    });

    // ref로 선택한 DOM에 포커스 설정

    nameInput.current.focus();
  };
  
  return (
    <>
      <input
        type="text"
        placeholder="이름"
        onChange={onChange}
        value={name}
        name="name"
        ref={nameInput} // 선택하고싶은 DOM에 ref값 설정
      />
      ...
      <button onClick={onReset}>초기화</button>
      ...
    </>
  );
  ```
  </details>
  
### 배열 렌더링하기
> UserList.js
>
> `map()`함수로 배열 렌더링 하기
>
> key값 설정하기

- 배열을 렌더링 할 때는 인덱스를 일일이 참조하여 코드를 작성해주는 방법도 있지만, 동적인 배열(배열을 추가하거나 삭제)을 렌더링하는데 한계가 있다
- 동적인 배열을 렌더링 할 때는 `map()`함수를 활용하면 따로 코드를 수정하지 않아도 배열의 길이만큼 반복해주므로 편리하다
- 반복되는 요소는 컴포넌트로 따로 관리하는 것이 좋다.
- 컴포넌트를 반복해서 불러올 때는 key값이 필요한데
- 만약 배열 안의 원소가 가지고 있는 고유값이 있다면 (id나 key속성 등) 해당 값을 key값으로 설정하면 되고
    `{users.map(user => (
      <User user={user} key={user.id} />
    ))}`
- 고유한 값이 없다면 index를 참조하여 `map()`함수의 두번째인자에 넣어줄 수도 있다.
    `{users.map((user, index) => (
      <User user={user} key={index} />
    ))}`
- 단, index를 참조할 때는 각 요소의 key값이 고정된 것이 아니라 배열을 추가하고 삭제하는 과정에서 바뀔 수 있으므로 배열의 원소가 고유한 값을 이미 가지고 있다면 가능한한 해당 값을 key값으로 사용하는 것을 권장한다.
