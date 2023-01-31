# 리액트 실습 (with.벨로퍼트)


## 23.01.31(화)
### 여러개의 input 상태관리
- input 요소가 여러개일 때 단순히 `useState`를 여러번 사용하고 `onChange`도 여러개 만들어서 관리 할 수도 있지만 추천하는 방식은 아님

- input 요소에 `name`속성을 설정하고 name 값을 참조하는 방법을 추천함
```
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
- ```useState```에서는 문자열이 아닌 객체 형태로 상태를 관리한다
```
const [inputs, setInputs] = useState({
  name: "이름",
  nickname: "닉네임",
});
```
-
