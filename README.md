# 리액트 실습 (with.벨로퍼트)

## 23.01.31(화)

### 여러개의 input 상태관리

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
    name: "이름",
    nickname: "닉네임",
  });
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
