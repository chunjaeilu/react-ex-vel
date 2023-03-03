# 리액트 실습 노트
패스트캠퍼스에서 제공하는 리액트 온라인 강의 교재를 따라가면서 실습한 내용을 날짜별로 기록한다

앞선 기초문법은 선행하였으므로 1-09강부터 기록


https://react.vlpt.us/

## 23.01.31(화)
### 1-09. 여러개의 input 상태관리
> Inputs.js
>
> 이름과 닉네임을 입력하는 input 요소 상태관리

- input 요소가 여러개일 때 단순히 `useState`를 여러번 사용하고 `onChange`도 여러개 만들어서 관리 할 수도 있지만 추천하는 방식은 아님
- input 요소에 `name`속성을 설정하고 name 값을 참조하는 방법을 추천함
  <details>
    <summary>코드 보기</summary>
    
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
    <summary>코드 보기</summary>
    
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
  
### 1-10. useRef로 DOM 선택하기
> Inputs.js
>
> useRef로 초기화버튼 클릭시 input에 포커스 설정하기

- vaScript에서는 DOM을 선택할 때 `querySelector`나 `getElementById` 등을 사용하지만 리액트에서 DOM을 선택할 때는 `useRef`Hook을 사용한다.
- Ref객체의 `.current` 로 선택한 DOM을 받는다.
- 선택하고싶은 DOM에 ref값을 설정하고 `ref={nameInput}`
- 선택한 DOM요소의 ref 객체를 생성한 뒤 `const nameInput = useRef();`
- ref객체명.current 를 이용해 객체를 조작한다 `nameInput.current.focus();`
  <details>
    <summary>코드 보기</summary>
    
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
  
### 1-11. 배열 렌더링하기
> UserList_01.js
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

### 1-12. useRef로 컴포넌트 안의 변수 관리하기
> UserList_02.js, CreateUser_01.js
>
> useRef를 활용해 컴포넌트 안의 변수를 생성

- `useRef`Hook은 DOM을 선택하는 것 외에 컴포넌트 안에서 조회 및 수정할 수 있는 변수를 관리하는 기능이 있다. 
- useRef로 관리되는 변수는 값이 바뀌어도 컴포넌트가 리렌더링 되지 않는다.
- 리액트 컴포넌트에서 변수의 상태를 변경하는 함수를 호출하고 나서 리렌더링 이후에 업데이트된 상태를 조회할 수 있으나, useRef로 관리되는 변수는 렌더링 없이 설정 후 바로 조회할 수 있다.
- Ref로 관리할 변수 생성 : `const nextId = useRef(4);`
  - `useRef()`를 사용할 때 파마미터 값을 넣어주면 해당 값이 `.current`의 기본값이 됨
  - 해당 값을 조회하거나 수정할 때는 `.current` 값을 조회하면 됨
  ```javascript
  // onCreate 함수를 실행할 때마다 nextId 값을 1씩 증가
  const onCreate = () => {
    ...
    nextId.current += 1;
  };
  ```

### 1-13. 배열에 항목 추가하기
> UserList_02.js, CreateUser_01.js
>
> 스프레드 연산자로 배열에 새로운 항목 추가 (Create)
> 
> Create함수 props로 전달하고 자식 컴포넌트에서 항목 추가 요청
> 
> `useState`로 배열 관리

- State로 관리되는 변수 배열에 변화를 줄 때는 불변성을 지켜줘야 하기 때문에 `push`,`splice`,`sort` 등의 함수를 사용하면 안됨
  - 배열을 수정할 때는 기존 배열을 한번 복사하고 복사한 배열을 수정하거나
  - spread 연산자를 사용하거나 `setUsers([...users, user]);`
  - `concat()`함수를 사용할 수 있다. `setUsers(users.concat(user));`
- 상태관리 함수는 부모 컴포넌트(App)에서 처리하고, 변수와 마찬가지로 함수도 props로 전달하여 자식 컴포넌트에서 함수 실행을 요청할 수 있다.

  <details>
    <summary>코드 보기</summary>
    
    ```javascript
    // App.js
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

      return (
        <>
          <CreateUser
            username={username}
            email={email}
            onChange={onChange}
            onCreate={onCreate}
          />
          <UserList2 users={users} />
        </>
      );
    }
    ```  
  
    ```javascript
    // UserList2.js
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
    // User 컴포넌트 생성
    function User({ user }) {
      return (
        <div>
          <b>{user.username}</b> <span>({user.email})</span>
        </div>
      );
    }
    ```  
  
    ```javascript    
    // CreateUser.js
    export default function CreateUser({ username, email, onChange, onCreate }) {
      return (
        <div>
          <input
            name="username"
            placeholder="계정명"
            onChange={onChange}
            value={username}
          />
          <input
            name="email"
            placeholder="이메일"
            onChange={onChange}
            value={email}
          />
          <button onClick={onCreate}>등록</button>
        </div>
      );
    }
    ```
  </details>

### 1-14. 배열에서 항목 제거하기
> UserList_02.js
>
> 삭제함수 props로 전달하고 자식 컴포넌트에서 항목 삭제 요청
> 
> `filter`함수를 활용해 선택한 요소 삭제

- 삭제버튼 렌더링(매개변수에 key값 참조) `<button onClick={() => onRemove(user.id)}>삭제</button>`
- 컴포넌트에서 매개변수를 전달할 때는 위와 같이 콜백함수를 이용해야 한다
  - `onClick={함수()}` 형태는 해당 페이지가 렌더링 됨과 동시에 함수를 실행한다. 이를 막기 위해 `onClick={함수명}` 문법을 사용하는 것인데
  - `{함수(매개변수)}` 형태는 위 사례와 같이 페이지가 렌더링 됨과 동시에 함수를 실행한다
  - 하지만 매개변수는 페이지가 렌더링 되었을때가 아니라 유저가 버튼을 클릭해야 참조할 수 있으므로 위와같은 형태는 오류가 발생한다.
  - 따라서 콜백함수를 이용해 `onClick={()=>{함수(매개변수)}}` 형태로 요청해야 한다.
- 자식의 자식 컴포넌트에 props를 전달 할때는 자식 컴포넌트에 먼저 전달한 후 자식의 자식 컴포넌트에 다시 전달한다
  <details>
    <summary>코드 보기</summary>
    
    ```javascript
    // UserList2.js
    // 자식 컴포넌트에 onRemove를 먼저 전달한 후
    export default function UserList2({ users, onRemove }) {
      return (
        ...
              <User key={user.id} user={user} onRemove={onRemove} />
        ...
    // 자식의 자식 컴포넌트에 onRemove를 전달한다
    function User({ user, onRemove }) {
      return (
        <div>
          <b>{user.username}</b> <span>({user.email})</span>
          <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
      );
    }
    ```
  </details>
- `filter()`함수를 활용하여 user.id가 매개변수로 전달된 id값과 일치하지 않는 원소만 추출하면 결과적으로 user.id가 매개변수와 같은 배열을 제거하는 셈이 된다
  <details>
    <summary>코드 보기</summary>
    
    ```javascript
    // App.js
    const onRemove = (id) => {
      setUsers(users.filter((user) => user.id !== id));
    };
    ```
  </details>

## 23.02.01(수)
### 1-15. 배열 항목 수정하기
> UserList_02.js
>
> `map()`함수를 이용해 배열의 불변성을 유지하면서 배열을 업데이트(수정)할 수 있다
>
> `...user` 스프레드 연산자를 이용해 배열 원소의 속성을 선택할 수 있다

- users 배열에 `active` 속성을 부여한다
  <details>
    <summary>코드 보기</summary>
    
    ```javascript
    // App.js
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
    ```
  </details>
- 하위 컴포넌트에서 삼항연산자를 이용해 active 속성에 따라 스타일이 바뀌도록 지정한다
- on이벤트로 `onToggle` 함수 실행을 요청한다
  ```javascript
  // UserList2.js >> User 컴포넌트
  ...
  <b 
    style={{
      cursor: "pointer",
      color: user.active ? "green" : "black"
      // user.active가 true이면 color를 'green', false이면 'black' 으로 설정
    }}
    onMouseOver={() => onToggle(user.id)}
    // 사용자가 선택한(마우스를 올린) `user.id`를 매개변수로 전달
  >
  ...
  ```
- 전달받은 `user.id` 매개변수를 참조해 `onToggle()`함수 실행
- 스프레드연산자 `{...user, 속성명: 속성값}` 는 user 객체의 속성을 펼친 뒤 특정 속성을 선택한다
  ```javascript
  // App.js
  ...
  const onToggle = (id) => {
    setUsers(
      // map함수는 특정인자를 바꾸고 새로운 배열을 출력한다
      // setUsers 내부에 map함수를 사용하면 map함수로 바뀐 새로운 배열이 users에 대입된다
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
        // user.id === id ? | users 배열 중 id가 매개변수로 전달받은 id와 일치하면
        // { ...user, active: !user.active } | 해당 user의 active 속성을 현재와 반대로 전환(true >> false, false >> true)시키고
        // : user | 일치하지 않는 user는 그대로 출력함
      )
    );
  };
  ...
  ```
  
### 1-16. useEffect Hook
> UserList_02.js
>
> `useEffect` Hook을 활용해 마운트/언마운트/업데이트시 특정 작업을 수행한다

- `useEffect`를 사용할 때는 첫번째 파라미터에는 함수, 두번째 파라미터에는 의존값이 들어있는 배열(`deps`)을 넣는다. `useEffect(()=>{실행코드},[의존값]);`
  - `deps`는 배열 안의 의존값의 변화를 인식하면 함수를 실행한다는 의미이다.
  - `deps`에 빈 배열 `[]`을 넣으면 컴포넌트가 처음 렌더링 될 때(마운트) 한 번만 실행한다.
  - `deps`를 비워두면 `useEffect(()=>{실행코드});` 모든 변수의 변화에 반응하므로 권장하지 않는다.
- useEffect는 `cleanup` 함수를 반환할 수 있는데, `deps`에 빈 배열 `[]`을 넣으면 컴포넌트가 사라질 때(언마운트) 실행된다.
  - `cleanup` 함수는 렌더링 될 때 이전에 남은 함수를 실행시켜 메모리 누수를 막을 수 있다
  - `cleanup` 함수는 setState나 setTimeout, API 요청과 같은 비동기함수가 작동할 때 조건문을 걸어 언마운트 되었을 때만 실행할 수 있도록 한다
  - 메모리 누수를 막기 위해 useRef로 상태를 관리할 수도 있다.
  <details>
    <summary>코드 보기</summary>
    
    ```javascript
    // UserList2.js >> User 컴포넌트
    useEffect(() => {
      console.log("컴포넌트가 화면에 나타남");
      return () => {
        console.log("컴포넌트가 화면에서 사라짐");
        // 컴포넌트가 사라질 때(유저 목록을 삭제할 때) 반환되는 함수 (cleanup 함수)
      }
    },[]);
    ```
    <p align='center'><img src ='https://user-images.githubusercontent.com/112890661/215961434-e71604c5-a1fc-4ec1-ab92-c6368e484607.png' width='350'>&nbsp;&nbsp;&nbsp;<img src='https://user-images.githubusercontent.com/112890661/215961361-4fd60c5d-2f5f-49f2-9dc7-e6e4e2068c39.png' width="350"></p>
  </details>
- `deps`에 특정 값을 넣으면
  - 처음 마운트 될 때도 호출되고 지정한 값이 바뀔 때도 호출된다
  - `cleanup`함수는 언마운트시에도 호출되고 값이 바뀌기 직전에도 호출된다
- `useEffect()` 안에서 사용하는 상태나 props가 있다면, `deps`에 해당 값을 반드시 넣어줘야 한다
  - 만약 해당 상태나 props를 `deps`에 넣어주지 않으면 `useEffect`에 등록한 함수가 실행될 때 최신 상태/props를 반영하지 않게 된다
  <details>
    <summary>코드 보기</summary>
    
    ```javascript
    // UserList2.js >> User 컴포넌트
    useEffect(() => {
      console.log("user값이 설정됨", user.id);
      return () => {
        console.log("user가 바뀌기 전", user.id);
      }
    }, [user]);
    ```
    - 최초 마운트 될 때와 user 상태를 변화시킬 때 useEffect 안의 함수가 작동되고, user를 삭제(언마운트)하거나 상태를 변경하기 직전에 '...바뀌기 전' 함수가 실행되는 것을 알 수 있다.
    <p align='center'><img src ='https://user-images.githubusercontent.com/112890661/215967561-f3173953-3643-455b-9ba3-5fec980b35fc.png' width='350'></p>
  </details>

### 1-17. useMemo Hook
> App_01.js >> countActiveUsers 컴포넌트
>
> `useMemo` Hook을 활용해 연산한 값을 재사용 할 수 있다.

- `user.active`가 활성화 된 개수를 구하는 컴포넌트 함수 `countActiveUsers()`를 생성하고
- `countActiveUsers`에서 리턴한 값을 `count`변수에 넣어준다
  <details>
    <summary>코드 보기</summary>
    
    ```javascript
    // App.js
    function countActiveUsers(users) {
      console.log("활성 사용자 수를 세는 중...");
      return users.filter((user) => user.active).length;
      // users 배열에서 active가 true인 새로운 배열을 추출하고, 배열의 길이를 리턴
    }
    ...
    const count = useMemo(() => countActiveUsers(users), [users]);
    return (
      ...
       <div>활성 사용자 수 : {count}</div>
      ...
    );
    ```
    <p align='center'><image src = 'https://user-images.githubusercontent.com/112890661/215978658-fe241649-4d01-4b8a-ae95-f2ee60fccabf.png' width='350'></p>
  </details>
- 활성 사용자 수는 제대로 렌더링 되지만 함수 호출을 감지하기 위해 작성한 `console.log('활성 사용자...')`는 유저정보만 입력해도 계속 호출되는 것을 알 수 있다.
  - `input`값이 바뀔 때도 컴포넌트가 리렌더링 된다는 의미인데, 이렇게 리렌더링이 불필요할때도 함수를 호출해서 자원이 낭비된다.
- 이런 현상을 해결하기 위해 사용하는 것이 `useMemo` Hook
  - 기본형 : `useMemo(()=>{실행코드;},[deps])`
  - 첫번째 인자에는 연산을 정의하는 함수, 두번째 인자에는 `deps` 배열을 넣어준다.
  - `deps`의 내용이 바뀌면 함수를 실행하고, 내용이 바뀌지 않으면 이전에 연산한 값을 재사용 한다.
  ```javascript
  const count = useMemo(() => countActiveUsers(users), [users]);
  // users의 내용이 바뀔 때만 countActiveUsers() 함수를 실행
  ```
  <p align='center'><image src='https://user-images.githubusercontent.com/112890661/215980510-74d51af4-9a17-4422-b42c-bd1d080dd84b.png' width='350'></p>
- `input` 값이 바뀌어도 users 배열의 내용은 변하지 않기 때문에 불필요한 함수호출이 일어나지 않는다.

### 1-18. useCallback Hook
> App_01.js
>
> `useCallback` Hook을 활용해 함수를 재사용 할 수 있다

- `useCallback`은 `useMemo` Hook에서 파생된 Hook으로, 사용 목적과 방법 또한 유사하다.
- 컴포넌트에 선언한 함수는 컴포넌트가 리렌더링 될 때 마다 새로 만들어지므로 불필요한 호출을 반복한다.
- 함수 생성 자체가 큰 부하를 가져오진 않지만 최적화를 위해 함수를 필요할때만 만들고 재사용 하는 것은 중요하다.
- 기본형 : `const 함수명 = useCallback(()=>{실행코드},[deps])`
- `useEffect`와 마찬가지로 `useCallback` 내부에서 사용하는 상태나 props는 반드시 `deps`에 넣어줘야 한다.
- 이전에 생성했던 `onCreate()`, `onRemove()`, `onToggle()` 함수를 `useCallback`을 사용해 재사용 할 수 있도록 해보자
  <details>
    <summary>코드 보기</summary>
    
    ```javascript
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
    },[users, username, email]);
    
    const onRemove = useCallback(id => {
      // filter함수를 이용, user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
      // 결과적으로 user.id 가 id 인 것을 제거함
      setUsers(users.filter((user) => user.id !== id));
    }, [users]);
    
    const onToggle = useCallback(id => {
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
    }, [users]);
    ```
  </details>

### 1-19. React.memo 함수
> App_01.js, CreateUser_01.js, UserList_02.js
>
> `React.memo` 함수를 사용한 컴포넌트 리렌더링 방지
  
- `React.memo` 함수는 컴포넌트의 props가 바뀌지 않으면 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화를 해줄 수 있다
- 이 함수를 사용하면 컴포넌트에서 리렌더링이 필요한 상황에서만 리렌더링을 하도록 설정할 수 있다.
- props를 받는 컴포넌트를 `React.memo()`로 감싸주면 된다.
  <details>
  	<summary>코드 보기</summary>
    
  	```javascript
    // CreateUser.js
    import React from "react";

    const CreateUser = ({ username, email, onChange, onCreate }) => {
      return (
        ...
      );
    };
    
    // 컴포넌트 함수를 만들고 따로 export 하는 경우(rfce) 컴포넌트 이름을 React.memo()로 감싼다
    export default React.memo(CreateUser);
  	```
    
    ```javascript
    // UserList2.js
    import React from "react";
    
    // 컴포넌트 함수를 선언함과 동시에 export 하는 경우(rfc) React.memo()로 함수 전체를 감싼다
    export default React.memo(({ users, onRemove, onToggle }) => {
      return (
        ...
      );
    });
    
    // 컴포넌트 내부에 생성한 컴포넌트로, 따로 export 하지 않는 경우에도 React.memo()로 함수 전체를 감싼다
    const User = React.memo(({ user, onRemove, onToggle }) => {
      ...
      return (
        ...
      );
    });
  	```
	</details>
- 여기까지 수행하면 input을 입력하는 동안 UserList는 리렌더링 되지 않는다.
- 그런데, UserList 중 하나라도 수정하면 users 배열에 변화가 생기기 때문에 users를 `deps`로 가지는 모든 함수가 리렌더링 된다.
- 이를 최적화 하기 위해서는 함수에서 `useState`로 관리하는 users를 참조하지 않으면 된다.
   - 함수에 전달받는 `deps` 배열에서 users를 삭제한다
   - useState에 users를 참조하지 않고 함수형 업데이트 방식을 사용한다. `setUsers(users => 바뀐 users)`
   - 함수형 업데이트를 사용하면 `setUsers`에 등록하는 콜백함수의 파라미터에서 최신 `users`를 참조할 수 있기 때문에 `deps`에 users를 넣지 않아도 된다.
  <details>
    <summary>코드 보기</summary>
    
    ```javascript
    // App.js
    // setUsers()에서 함수형 업데이트 방식으로 관리하고, deps에서 users를 삭제
    const onCreate = useCallback(() => {
      ...
      // setUsers([...users, user]);
      setUsers((users) => users.concat(user));
      ...
    }, [username, email]);
    
    const onRemove = useCallback((id) => {
      ...
      // setUsers(users.filter((user) => user.id !== id));
      setUsers((users) => users.filter((user) => user.id !== id));
    }, []);
    
    const onToggle = useCallback((id) => {
      // setUsers(users.map((user) => (user.id === id ? { ...user, active: !user.active } : user)));
      setUsers((users) => users.map((user) => user.id === id ? { ...user, active: !user.active } : user));
    }, []);
    ```
  </details>
- 여기까지 작업을 완료하면 특정 항목을 수정할 때 해당 항목만 리렌더링 된다. 최적화 완료
- 단, `useCallback`, `useMemo`, `React.memo`를 이용한 렌더링 최적화는 컴포넌트의 성능을 실제로 개선할 수 있는 상황에서만 사용하는 것이 좋다
- 예를 들어 렌더링 최적화를 하지 않을 컴포넌트에 React.memo를 사용하는 것은 불필요한 props 비교만 하는 것이기 때문에 오히려 불필요한 작업이 늘어나기도 하며, 의도치 않은 버그들이 발생할 수 있기 때문

## 23.02.02(목)
### 1-20. useReducer Hook
> Counter_01.js, App_02.js
>
> `useReducer` Hook을 활용해 상태를 관리한다 (`useState`와 유사함)
>
> `useReducer` Hook을 활용하면 상태 업데이트 로직을 컴포넌트에서 분리해 관리할 수 있다.

#### reducer
- `reducer` : 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수

  ```javascript
  function reducer(state, action) {
    // 새로운 상태를 만드는 로직
    // const nextState = ...
    return nextState;
  }
  ```
- `reducer`함수에서 상태를 관리하는 로직을 만들고 `useReducer`에서 `reducer`함수를 실행시키는 방식으로 사용된다.
- `reducer`에서 반환(`return`)하는 상태는 컴포넌트가 지닐 새로운 상태가 된다.
- `action` 파라미터는 업데이트를 위한 정보를 가지고 있다. 주로 `type`값을 지닌 객체 형태로 사용하지만 꼭 따라야 하는 규칙이 있는 것은 아님
  <details>
    <summary>예시 보기</summary>
    
    ```javascript
    // action 사용 예시

    // 카운터에 1을 더하는 액션
    {
      type: 'INCREMENT'
    }

    // 새 할 일을 등록하는 액션
    {
      type: 'ADD_TODO',
      todo: {
        id: 1,
        text: 'useReducer 배우기',
        done: false,
      }
    }
    ```
  </details>

- `action` 객체의 형태는 자유이며, `type` 값은 대문자와 언더바( _ )로 구성하는 암묵적 룰이 있지만 이것 역시 강제되는 것은 아님

#### useReducer
- `useReducer` 기본형
  ```javascript
  const [state, dispatch] = useReducer(reducer, initialState);
  ```
- `state` : 컴포넌트에서 사용할 수 있는 상태변수
- `dispatch` : action을 발생시키는 함수 `dispatch({type:'INCREMENT'})`
- `reducer` : `reducer()`함수 실행시킴
- `initialState` : 초기값 설정
- `useReducer` 사용방법
  - `useReducer`로 관리할 변수를 선언한다
  ```javascript
  const [number, dispatch] = useReducer(reducer, 0);
  ```
  - 실행할 함수 내부에 상태관리함수 `dispatch`로 action객체를 생성한다
  ```javascript
  const onIncrease = () => {
    dispatch({type:'INCREMENT'});
    // type이 'INCREMENT'인 action 객체 생성
  };
  const onDecrease = () => {
    dispatch({type:'DECREMENT'});
    // type이 'DECREMENT'인 action 객체 생성
  };
  ```
  - `reducer`함수에서 전달받은 state와 action 객체를 이용해 각각의 함수에서 변동시킬 로직을 작성한다
  ```javascript
  // 여기서 state는 useReducer로 관리를 선언한 number 변수의 현재 상태를 의미한다
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
  ```
- 이를 바탕으로 App.js의 유저리스트를 `useState`가 아닌 `useReducer`로 관리해보자
  <details>
    <summary>코드 보기</summary>

    ```javascript
    // App.js
    import React, { useReducer, useRef, useMemo, useCallback } from "react";

    import UserList2 from "./components/UserList2";
    import CreateUser from "./components/CreateUser";

    const countActiveUsers = (users) => {
      console.log("활성 사용자 수를 세는 중...");
      return users.filter((user) => user.active).length;
      // users 배열에서 active가 true인 새로운 배열을 추출하고, 배열의 길이를 리턴
    };

    // App에서 사용할 초기 상태를 컴포넌트 바깥으로 분리 (useReducer를 사용하는 목적이 컴포넌트와 상태 업데이트 로직을 분리하는 것이므로..)
    const initialState = {
      inputs:{
        username: "",
        email: "",
      },
      users:[
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
        }
      ]
    }

    // reducer() 함수 생성
    function reducer(state, action) {
      switch (action.type) {
        // action 객체의 type이 'CHANGE_INPUT'일때 실행 (onChange)
        case 'CHANGE_INPUT':
          return {
            ...state, // state 객체를 spread 연산자로 펼침
            inputs: { // state.inputs 선택
              ...state.inputs, // state.inputs를 spread 연산자로 펼침
              [action.name]: action.value // action객체의 name을 선택(이름을 입력하면 name: username, 메일주소를 입력할 때는 name: email)해서 action 객체의 value 값을 반영
            }
          };
        // action 객체의 type이 'CREATE_USER'일때 실행 (onCreate)
        case 'CREATE_USER':
          return {
            // inputs 초기화
            inputs : initialState.inputs,
            // users 업데이트
            users: state.users.concat(action.user)
          };
        // action 객체의 type이 'REMOVE_USER'일때 실행 (onRemove)
        case 'REMOVE_USER':
          return {
            ...state, // state 객체를 spread 연산자로 펼침
            users: state.users.filter(user => user.id !== action.id) // users 선택, filter함수를 이용해 아이디값이 전달받은 action.id값(선택한 id값)과 일치하지 않는 users 배열을 리턴
          };
        // action 객체의 type이 'TOGGLE_USER'일때 실행 (onToggle)
        case 'TOGGLE_USER':
          return {
            ...state,
            users: state.users.map(user => user.id === action.id ? {...user, active: !user.active } : user)
          }
        default:
          return state;  
      }
    }

    function App() {
      // initialState 객체를 초기값으로 가지는 state 를 useReducer로 관리하겠다는 선언
      const [state, dispatch] = useReducer(reducer, initialState);
      const nextId = useRef(4);

      const { users } = state;
      const { username, email } = state.inputs;

      // onChange 함수
      const onChange = useCallback(e => {
        const {name, value} = e.target;
        dispatch({
          type: 'CHANGE_INPUT',
          name,
          value
        })
      },[])

      // onCreate 함수
      const onCreate = useCallback(() => {
        dispatch({
          type: 'CREATE_USER',
          user: {
            id: nextId.current,
            username,
            email
          }
        });
        nextId.current += 1;
      },[username, email])

      // onRemove 함수
      const onRemove = useCallback((id) => {
        dispatch({
          type: 'REMOVE_USER',
          id
        });
      },[])

      // onToggle 함수
      const onToggle = useCallback((id) => {
        dispatch({
          type: 'TOGGLE_USER',
          id
        })
      },[])

      // countActiveUsers 함수 실행
      const count = useMemo(() => countActiveUsers(users), [users]);

      return (
        <>
          <CreateUser
            username={username}
            email={email}
            onChange={onChange}
            onCreate={onCreate}
          />
          <UserList2
            users={users}
            onRemove={onRemove}
            onToggle={onToggle}
          />

          <div>활성 사용자 수 : {count}</div>
        </>
      );
    }

    export default App;

    ```
  </details>
>#### Tip!!
> <b>reducer 함수에서도 비구조화 할당을 할 수 있다.</b>
>  - 위 코드에서는 state가 내부의 inputs와 users의 구조로 불변하기 때문에 이 부분에 대해서
>  ```javascript
>  const { users, inputs } = state;
>  const { name, value, user, id } = action;
>  ```
>  - 와 같은 식으로 작성한다면, state.users를 users로 축약할 수 있고 onCreate에서 username, email과 같이 따로따로 적던 부분도 ...inputs로 작성할 수 있다
>  - `action`의 경우 type에 따라 받아오는 값이 다르므로 할당연산을 할 수 없다 생각할 수 있지만, 받아오지 않는 값은 undefined로 처리하기 때문에 타입합수에서 undefined 요소를 사용하려 하지만 않는다면 비구조화 할당을 해도 상관없다

>#### useState vs useReducer
><b> 복잡한 구조가 아니라면 `useState`를 유지하는게 편하다.</b>
> - 컴포넌트에서 관리하는 값이 하나이고, 그 값이 단순한 숫자, 문자열 또는 boolean 값이라면 `useState` 로 관리하는게 편하고
> - 컴포넌트에서 관리하는 값이 여러개가 되어서 상태의 구조가 복잡해진다면 `useReducer`로 관리하는게 편할 수 있다.
> - 한 함수에서 state setter 함수를 여러번 사용해야 하는 경우, `useReducer` 사용을 고민해볼만 함


### 1-21. 커스텀 Hooks 만들기
> App_02.js, useInputs.js, useInputs_01.js
>
> 컴포넌트에서 반복되는 로직을 커스텀 Hooks로 만들어 쉽게 재사용 할 수 있다.
>
> 커스텀 Hooks는 주로 src 디렉토리에 hooks 라는 디렉토리를 만들고, 그 안에 useSomething.js 파일로 관리한다.

#### input을 관리하는 커스텀 Hook을 만들어보자
- root/src/hooks/ 디렉토리에 useInputs.js 파일을 생성한다
- useInput.js에 `input` 관련 로직을 작성해준다.
  <details>
    <summary>코드 보기</summary>

    ```javascript
    // useInputs.js
    import { useState, useCallback } from "react";

    export default function useInputs(initialForm) {
      // 여기서 initialForm은 App.js에서 설정한 초기값 {username:"", email:""}을 의미
      const [form, setForm] = useState(initialForm);

      // change
      const onChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm((form) => ({ ...form, [name]: value }));
        // input에 값을 입력하면 form 변수에 {username:"이름", email:"메일주소"} 형태로 저장된다.
      }, []);

      const reset = useCallback(() => {
        // form 초기화
        setForm(initialForm);
      }, [initialForm]);

      return [form, onChange, reset];
      // form객체, onChange()함수, reset()함수를 반환
    }
    ```
  </details>
- `useInputs` Hook을 App.js에 반영해보자
  - `useReducer`로 관리하는 input 관련 로직을 삭제하고 삭제한 로직을 대신할 useInputs를 설정한다.
  - 새로운 input이 전송되었을 때(`onCreate`) input 값을 초기화하는 함수 `reset()`을 `onCreate()` 함수 내부에 작성해준다
  <details>
    <summary>코드 보기</summary>

    ```javascript
    // App.js
    // 커스텀훅 import
    import useInputs from "./hooks/useInputs";
    ...
    function App() {
      ...
      // 삭제된 inputs 관련 작업을 대신할 useInputs 생성
      // useInputs에서 반환한 form, onChange, reset을 받아 상태를 업데이트 한다
      const [{ username, email }, onChange, reset] = useInputs({
        username: "",
        email: "",
      });
      // 초기값 {username: "", email: ""} 가 useInputs에 initialForm 객체로 전달된다
      ...
      
      // onCreate 함수
      const onCreate = useCallback(() => {
        ...
        reset(); // 새로운 항목을 추가할때 input 값 초기화 (커스텀 Hook useInputs에서 받아옴)
        nextId.current += 1;
      }, [username, email, reset]);
      // 함수 내부에서 reset 함수를 호출하므로 deps 배열에 reset을 추가해야 한다
      ...
    }
    ```
  </details>

#### useInputs 커스텀 Hook을 useReducer를 사용해 구현하기
<details>
  <summary>펼쳐보기</summary>

  - useState로 관리하는 변수를 useReducer로 관리 선언
    ```javascript
    const [form, dispatch] = useReducer(reducer, initialForm);
    ```
  - 함수 내부에 `setForm()` 함수를 `dispatch()` 함수로 변경
    ```javascript
    const onChange = useCallback((e) => {
      const { name, value } = e.target;
      dispatch({type: "CHANGE_INPUT", name, value});
    }, []);

    const reset = useCallback(() => {
      // form 초기화
      dispatch({ type: "RESET" });
    }, []); // 더이상 initialForm을 참조하지 않으므로 deps에서 제거해준다
    ```
  - 컴포넌트 외부에 `reducer()` 함수 작성
    ```javascript
    function reducer(state, action) {
      switch (action.type) {
        // onChange
        case "CHANGE_INPUT":
          return {
            ...state,
            [action.name]: action.value,
          };
        // reset
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
    ```
  </details>

## 23.02.08(수)
### 1-22. Context API를 사용한 전역 값 관리
> App.js, UserList.js, CreateUser.js
>
> Context API를 활용해 프로젝트 안에서 **전역적**으로 사용하는 값을 관리할 수 있다

#### Context API 사용목적
- 일반적인 리액트 프로젝트에서 상위 컴포넌트에서 선언된 데이터는 하위 컴포넌트에 props 를 통해 전달된다.
- 구조가 단순한 프로젝트는 크게 상관없겠지만 컴포넌트 구조가 복잡한 프로젝트는 여러개의 컴포넌트를 거쳐 전달되어야 하는 경우가 생길 수 있는데,
- 전달과정 자체가 번거로워질 뿐만 아니라 오류가 발생하기도 쉽다.
- Context API를 사용하면 프로젝트 안에서 전역적으로 사용하는 값을 관리할 수 있는데, '상위>하위>차하위' 로 연결되는 전달과정을 단순화 하고, 선언된 값을 프로젝트 어디서나 자유롭게 꺼내 쓸 수 있다는 장점이 있다.

#### Context API 사용방법
##### App.js
- `UserDispatch` 라는 Context 생성 및 내보내기
  - `React.createContext(defaultValue)` : Context 생성 함수
  - Context(여기서는 `UserDispatch`) 객체를 구독하고있는 컴포넌트를 렌더링 할 때 React는 트리 상위에서 가장 가까이 있는 짝이 맞는 `Provider` 컴포넌트를 통해서 현재값을 읽어오는데, `defaultValue` 매개변수는 트리 안에서 적절한 `Provider`를 찾지 못했을 때 쓰이는 값
- `<Context명.Provider>` 태그로 렌더링 할 컴포넌트들을 감싸고 `value` 값을 설정하면 감싸진 모든 컴포넌트에서 언제든지 Context 값(여기서는 dispatch)을 꺼내 쓸 수 있게 된다.
  - 여기서 `Provider`컴포넌트는 `value` 값을 props로 하위 컴포넌트에 전달하는 역할
  - `Provider` 하위에 또다른 `Provider`를 배치하는 것도 가능하며, 이 경우 하위 `Provider`가 우선한다
  - context를 구독하고 있는 하위 컴포넌트들은 `Provider`의 `value` props가 바뀔 때마다 렌더링 된다. (`Provider`는 하위 컴포넌트에 context의 변화를 알리는 역할)
- 하위 컴포넌트에 `props`로 전달하던 변수와 함수를 삭제
  - `reducer()` 함수를 호출하는 기능만 수행하던 함수는 삭제 (하위 컴포넌트에서 직접 reducer 호출)
  - 재사용이 필요 없는 함수는 해당 함수를 직접 사용하는 하위 컴포넌트로 이동
  ```javascript
  // App.js
  ...
  export const UserDispatch = React.createContext(null);
  ...
  function App() {
    return (
      <UserDispatch.Provider value={dispatch}>
        <CreateUser />
        <UserList users={users} />

        <div>활성 사용자 수 : {count}</div>
      </UserDispatch.Provider>
    )
  }
  ```
##### UserList.js > User 컴포넌트
- `useContext` Hook과 App.js에서 export한 Context(`UserDispatch`) import
  ```javascript
  import React, { useContext } from "react";
  import { UserDispatch } from "../App";
  ```
- `useContext` Hook을 통해 구독(조회)할 Context를 변수(dispatch)에 저장
  ```javascript
  const dispatch = useContext(UserDispatch);
  ```
- `props`를 전달받아 함수를 호출하던 이벤트핸들러에 `reducer()`를 호출하는 `dispatch()`함수 직접 선언 (상위 컴포넌트에 onToggle, onRemove 함수 실행을 요청하는 과정을 하위 컴포넌트에서 직접 수행)
  ```javascript
  <b
    ... 
    onClick={() => {
      dispatch({ type: "TOGGLE_USER", id: user.id });
    }}
  />
  <button
    onClick={() => {
      dispatch({ type: "REMOVE_USER", id: user.id });
    }}
  >
    삭제
  </button>
  ```
##### CreateUser.js
- input요소 및 `onCreate()` 함수 관련 로직을 하위 컴포넌트로 이동시킴
  - 해당 함수 및 변수는 다른 컴포넌트에서 재사용 하지 않고 CreateUser 컴포넌트에서만 사용하므로
- dispatch를 하위 컴포넌트에서 직접 사용해야 하므로 `useContext` Hook과 `UserDispatch` Context를 import 하고 Context를 구독할 번수(dispatch)를 선언하는 과정은 동일하게 진행해줘야 한다.
- 관련 코드는 생략

## 23.02.09(목)
### 1-23. Immer를 사용한 불변성 관리
> App.js
>
> Immer를 사용해 쉽게 불변성 관리를 할 수 있다

#### 불변성이란?
- 메모리 영역에서 값이 변하지 않는다는 것
- 원본 데이터 (변수, 배열, 상태 등)를 훼손하지 않고 새로운 영역에 할당하여 수정하는 개념
- 리액트에서는 상태값을 업데이트 할때 얕은 비교를 수행(배열이나 객체의 속성 하나하나를 비교하는게 아니라 이전 참조값과 현재 참조값만을 비교하여 상태변화를 감지 
- 배열이나 객체를 업데이트 할 때 직접 그 값을 변경하는것이 아니라 복사한 배열을 수정하거나 스프레드연산자, `concat()` 등을 사용하는 것도 불변성을 지키기 위한 이유

#### 불변성을 지켜야 하는 이유
- 효율적인 상태 업데이트
  - 얕은 비교를 통해 객체의 참조 주소값만 변경되었는지 확인한다
  - 계산 리소스를 줄여주고 효율적으로 상태를 업데이트 할 수 있다
- 불필요한 사이드이펙트 방지
  - 하나의 작업에서 원본데이터가 직접 변경될 경우, 원본데이터를 참조하고 있는 또다른 함수나 컴포넌트가 있다면 의도치 않은 사이드이펙트가 일어날 수 있다.
  - 프로그래밍의 복잡도 역시 올라간다.
  - 불변성을 지켜주면 사이드이펙트를 방지하고 프로그래밍 구조를 단순화 할 수 있다.

#### Immer 사용법
> Immer 라이브러리의 핵심은 **불변성에 신경쓰지 않는 것처럼 코드를 작성하되, 불변성 관리는 제대로 해주는 것**
>
> 상태를 업데이트 하는 배열이 객체의 깊은곳에 위치하지 않아 상대적으로 참조가 쉬운 경우, Immer를 사용하는 것보다 `concat`이나 `filter`를 사용하는게 더 간결할 수 있다.
> 
> 상황에 맞게 사용 여부를 판단할수 있도록 해야 함.

- install 
  ```cmd
  npm install immer
  ```
  ```cmd
  yarn add immer
  ```

- import : 강제는 아니지만 보통 `produce`라는 이름으로 불러온다
  ```javascript
  import produce from 'immer';
  ```
- `produce()` 함수 기본 사용법
  - 첫 번째 params : 수정하고싶은 상태 입력 (불변성 유지)
  - 두 번째 params : 업데이트를 정의하는 함수 입력 (새로운 상태 생성)
  - **두 번째 params에 작성한 함수에서 불변성에 대해 신경쓰지 않고 업데이트 해도 immer 라이브러리가 불변성을 지켜준다**
  ```javascript
  // immer로 관리할 변수(상태)
  const state = {
    number: 1,
    dontChangeMe: 2
  };

  // state : 수정할 상태
  // draft : 상태 업데이트 함수
  const nextState = produce(state, (draft) => {
    draft.number += 1;
  });

  console.log(nextState);
  // { number: 2, dontChangeMe: 2 }
  ```

#### `reducer`에서 Immer 사용하기
- `users` 의 상태를 관리하는 `reducer()` 함수에서 Immer 라이브러리를 사용해 상태관리를 해보자
- `push`, `splice` 등 배열을 직접 수정하는 함수를 사용해도 불변성을 지킬 수 있다.
  ```javascript
  // reducer() 함수 생성
  function reducer(state, action) {
    switch (action.type) {
      case "CREATE_USER":
        return produce(state, (draft) => {
          // 기존 코드
          users: state.users.concat(action.user),
          
          // immer 사용 코드
          draft.users.push(action.user);
        });
      case "REMOVE_USER":
        return produce(state, (draft) => {
          // 기존 코드
          ...state, 
          users: state.users.filter((user) => user.id !== action.id)
          
          // immer 사용 코드
          const index = draft.users.findIndex((user) => user.id === action.id);
          draft.users.splice(index, 1);
        });
      case "TOGGLE_USER":
        return produce(state, (draft) => {
          // 기존 코드
          ...state,
          users: state.users.map((user) =>
            user.id === action.id ? { ...user, active: !user.active } : user
          ),

          // immer 사용 코드
          const user = draft.users.find((user) => user.id === action.id);
          user.active = !user.active;
        });
      default:
        return state;
    }
  }
  ```

#### Immer와 함수형 업데이트
- 함수형 업데이트
  - `setTodo` 함수에 함수형 업데이트를 사용함으로써 `useCallback` 함수의 `deps` 배열에 상태변수 `todo` 를 생략해도 최신 상태를 반영하게 된다.
  ```javascript
  const [todo, setTodo] = useState({
    text: 'Hello',
    done: false
  });

  const onClick = useCallback(() => {
    setTodo(todo => ({
      ...todo,
      done: !todo.done
    }));
  }, []);
  ```
- Immer를 사용한 함수형 업데이트
  - `produce` 함수에 두 개의 파라미터를 넣어주면, 첫 번째 파라미터에 넣은 상태의 불변성을 유지하면서 새로운 상태를 만들지만
  - 첫 번째 파라미터(state, 여기서는 todo)를 생략하면, 함수에서 반환하는 값은 새로운 상태를 생성하는 것이 아니라 상태를 업데이트 해주는 함수가 된다.
  ```javascript
  const todo = {
    text: 'Hello',
    done: false
  };

  const updater = produce(draft => {
    draft.done = !draft.done;
  });

  const nextTodo = updater(todo);

  console.log(nextTodo);
  // { text: 'Hello', done: true }
  ```
- 결국, `produce`가 반환하는 것이 업데이트 함수가 되기 때문에 `useState`의 함수형 업데이트에 `produce`를 활용할 수 있다.
  ```javascript
    const [todo, setTodo] = useState({
    text: 'Hello',
    done: false
  });

  const onClick = useCallback(() => {
    setTodo(
      produce(draft => {
        draft.done = !draft.done;
      })
    );
  }, []);
  ```

## 23.02.13(월)
### 1-24. 클래스형 컴포넌트
> Hello.js, Counter.js, index.js
>
> 함수형 컴포넌트 외에도 클래스형 컴포넌트를 사용할 수 있다.

#### 과거의 유산, 클래스형 컴포넌트
- 클래스형 컴포넌트는 React v16.8 이전까지 리액트 프로젝트에서 컴포넌트를 선언하는 방식으로 사용
- 지금은 함수형 컴포넌트와 Hook을 사용할 것을 권장하므로 잘 사용하지 않음
- 간혹 클래스형 컴포넌트를 사용한 프로젝트를 유지보수 하거나 함수형 컴포넌트로 해결되지 않는 작업을 수행할 때 필요하므로 사용방법은 익혀두는 것이 좋다.

#### 컴포넌트
> 컴포넌트는 단순한 템플릿(데이터가 주어졌을 때 이에 맞추어 UI를 만들어주는 기능) 이상의 기능을 수행한다
>
> ***라이프사이클 API를 통해 컴포넌트가 화면에 나타날 때, 사라질 때, 변할 때 작업을 수행할 수 있다.***

#### 함수형 컴포넌트 vs 클래스형 컴포넌트
> ##### 클래스형 컴포넌트
>
> > stateful 컴포넌트 라고도 함 (로직과 상태를 컴포넌트 내에서 구현)
> >
> > state 기능 및 라이프사이클 기능을 수행할 수 있음
> >
> > 임의 메서드를 정의할 수 있음
> > 
> > render 함수를 반드시 포함해야 하고, 그 안에서 보여줄 JSX를 반환(return)
> >
> > class 문법을 사용해 과거 prototype을 이요해 구현하던 클래스 문법 구현 가능 (ES6~)
> > 
> > 클래스 내의 `constructor` 메서드에서 state의 초기값을 설정해주어야 함
> >
> > `constructor`를 작성할 때 `super(props)`를 반드시 호출해주어야 함
> >
> > state를 조회할 때는 `this.state`로, state의 값을 변경할 때는 `this.setState` 함수를 사용
> 
> ##### 함수형 컴포넌트
>
> > stateless 컴포넌트 라고도 함 (state를 직접 사용하지 않고 단순하게 데이터를 받아서 UI에 뿌려주기 때문)
> >
> > 클래스형 컴포넌트에 비해 선언하기가 편하고, 메모리 자원을 덜 사용함
> > 
> > 과거에는 state와 라이프사이클 API를 사용할 수 없었지만, Hook이 도입되면서 사용 가능해짐 


#### 클래스형 컴포넌트 사용방법
- 컴포넌트 API 선언
  ```javascript
  // Hello.js
  import React, { Component } from "react";
  ```
- 클래스형 컴포넌트 선언
  ```javascript
  class Hello extends Component {
    // static : props 기본값 설정
    static defaultProps = {
      name: '이름없음'
    };

    // render() 메소드 : 이 안에 렌더링 하고싶은 JSX 반환, 필수요소
    render() {
      // this.props : props 조회
      const { color, name, isSpecial } = this.props;

      return (
        <div style={{ color }}>
          {isSpecial && <b>*</b>}
          안녕하세요 {name}
        </div>
      );
    }
  }
  ```

#### Counter.js를 클래스형 컴포넌트로 바꿔보기
- 화면에 렌더링 (App.js는 기존 작업물이 많으므로 index.js에 Counter컴포넌트를 직접 불러온다)
  ```javascript
  // index.js
  ...
  import Counter from "./components/Counter";
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Counter />);
  ```
- 클래스형 컴포넌트 생성 및 커스텀 메서드 만들기
  - 컴포넌트에서 특정 이벤트를 처리할 때는 클래스 안에 커스텀메서드를 만들어 사용한다.
  - 메서드 : 클래스 내부에 종속된 함수, 보통 `handle...`이라고 이름 지음
  - 상태를 업데이트 할 때는 메서드에서 `this.setState` 함수를 사용
  - `this` : 선택한 컴포넌트 인스턴스를 가리킴
  - `this`가 컴포넌트 인스턴스를 가리키기 위해 메서드와 컴포넌트 인스턴스간의 관계를 유지시키도록 추가작업이 필요 (bind)
  - 커스텀메서드를 선언 할 때 화살표함수를 이용하면 `bind`작업을 간단히 수행할 수 있다 (javascript 공식 문법은 아니나 CRA로 만든 프로젝트에서 많이 사용)
  ```javascript
  class Counter extends Component {
    // 1. 클래스의 생성자 메서드 constructor 에서 bind 작업
    // constructor : 클래스의 생성자 메서드, props 파라미터 받아옴
    // constructor(props) {
      // super(props) : 파라미터 호출
      // super(props);
      // bind : 해당 함수에서 가리킬 this를 직접 설정
      // 이 클래스(Counter)가 컴포넌트로서 작동할 수 있도록 해주는 Component API쪽에 구현되어 있는 생성자함수를 먼저 실행해주고, 우리가 할 작업을 하겠다 라는 의미
      // this.handleIncrease = this.handleIncrease.bind(this);
      // this.handleDecrease = this.handleDecrease.bind(this);
    // }

    // 2. 커스텀메서드를 선언하면서 화살표함수를 이용해 'bind'작업 수행
    handleIncrease = () => {
      console.log(this);
      // {Counter {props: {…}, context: {…}, refs: {…}, updater: {…}, handleIncrease: ƒ, …}}
    }
    handleDecrease = () => {
      console.log(this);
    }
    
    render() {
    return (
      <div>
        <h2>0</h2>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
      </div>
    );
  }
  }
  ```
- 상태 관리하기(state)
  - 클래스형 컴포넌트에서 상태관리를 할 때는 `state`를 사용
  - `state` 선언 : `constructor` 내부에서 `this.state` 설정, 화살표함수를 이용할 때는 곧바로 `state`를 선언해도 됨
  - 상태를 업데이트 할 때는 `this.setState` 함수 사용
  ```javascript
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     counter: 0,
  //   };
  // }
  ...
  state = {
    counter: 0,
  };
  handleIncrease = () => {
    // 상태 업데이트 함수
    this.setState({
      counter: this.state.counter + 1,
    });
  };
  handleDecrease = () => {
    this.setState({
      counter: this.state.counter - 1,
    });
  };
  ```
- `setState` 함수형 업데이트
  - 함수형 업데이트는 한 함수에서 `setState`를 여러번 사용해야 하는 경우에 유용하다.
  - 예를 들어 `handleIncrease` 함수에서 `counter`를 증가시키는 `setState`함수를 두번 작성하면
  ```javascript
  handleIncrease = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
    this.setState({
      counter: this.state.counter + 1,
    });
  };
  ```
  - 기존 값에 1을 더해주는 함수를 두번 실행시키지만 그 결과가 2를 더해주지는 않는다 (0에서 1이 되는 함수를 두번 실행)
  - 함수형 업데이트를 사용하면 `this`를 참조하지 않고도 최신 상태를 반영하므로 기존 값에서 2를 더한 결과가 나타난다 
  ```javascript
  handleIncrease = () => {
    this.setState((state) => ({
      counter: state.counter + 1,
    }));
    this.setState((state) => ({
      counter: state.counter + 1,
    }));
  };
  ```
  - 만약, 상태가 업데이트 되고 나서 어떤 작업을 추가로 수행하고 싶다면 `setState`의 두 번째 파라미터에 콜백함수를 넣어줄 수도 있다.
  ```javascript
  handleIncrease = () => {
    this.setState(
      {
        // state 업데이트
        counter: this.state.counter + 1,
      },
      () => {
        // 이전 값이 아닌 업데이트 된 state의 counter 값이 콘솔에 출력된다
        console.log(this.state.counter);
      }
    );
  };
  ```

## 23.02.14(화)
### 1-25. LifeCycle Method (생명주기 메서드)
> 리액트 컴포넌트에 존재하는 LifeCycle(생명주기)의 정의를 이해할 수 있다
>
> 생명주기에 따른 메서드의 정의와 역할을 이해할 수 있다

#### LifeCycle(생명주기) 
> **모든 컴포넌트는 라이프사이클(생명주기)가 존재하며, 컴포넌트의 수명은 페이지에 렌더링되기 전인 `준비과정`에서 시작하여 페이지에서 `사라질 때` 끝난다**
- 컴포넌트를 처음 렌더링 할 때 어떤 작업을 처리해야 하거나 컴포넌트를 업데이트 하기 전후로 어떤 작업을 처리해야 할 수도 있고, 또 불필요한 업데이트를 방지해야 할 수도 있다
- 이때 사용하는 것이 라이프사이클 메서드
- 라이프사이클 메서드는 클래스형 컴포넌트에서만 사용(함수형 컴포넌트는 사용 불가, 대신 Hook을 사용하여 비슷한 작업을 처리할 수 있음)

#### LifeCycle Method(생명주기 메서드)
> 생명주기 메서드는 총 9개가 있으며, 이것을 3단계로 구분할 수 있다
> 
><img src ='https://i.imgur.com/cNfpEph.png'>

  - Mount(마운트) : 페이지에 컴포넌트가 나타남(렌더링)
    - constructor
    - getDerivedStateFromProps
    - render
    - componentDidMount
  - Update(업데이트) : 컴포넌트 정보를 업데이트 (리렌더링)
    - getDerivedStateFromProps
    - shouldComponentUpdate
    - render
    - getSnapshotBeforeUpdate
    - componentDidUpdate
  - Unmount(언마운트) : 페이지에서 컴포넌트가 사라짐
    - componentWillUnmount


#### Mount(마운트)
<p align='center'><img src="https://thebook.io/img/080203/173.jpg" width='300'><br> 마운트시 호출하는 메서드</p>

##### constructor
- 컴포넌트의 생성자 메서드, 컴포넌트가 만들어지면 가장 먼저 실행됨
- `this.props`, `this.state`에 접근하여 초기값을 설정하고 이벤트 처리 메서드를 바인딩 하기 위해 사용
- 파라미터 호출함수 `super(props)`를 반드시 첫 줄에 작성해주어야 함
  ```javascript
  constructor(props) {
    super(props);
    console.log("constructor");
  }
  ```
##### getDerivedStateFromProps
- 렌더가 시작되기 전에 `props`에 의존하여 `state`를 변경할 때 사용하는 메서드
- 그 이후 컴포넌트가 리렌더링(업데이트) 되기 전에도 매번 실행된다. (불필요한 실행이 반복될 수 있으므로 사용을 제한하는것이 좋다.)
- 메서드 앞에 `static`을 필요로 하고, 이 안에서는 `this`를 조회할 수 없고 다른 클래스메서드에도 접근할 수 없음
- 특정 객체를 반환하면 해당 객체 안의 내용들이 컴포넌트의 `state`로 저장됨
- 상태를 바꾸고싶지 않다면 `null`을 반환
  ```javascript
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }
  ```
##### render
- 준비한 UI를 렌더링 하는 메서드
- render 메서드 내부의 `return` 안의 내용이 렌더링 된다

##### componentDidMount
- 컴포넌트의 첫 번째 렌더링이 마치고 나면 호출되는 메서드(이 메서드가 호출되는 시점은 컴포넌트가 화면에 나타난 상태)
- 데이터 상호작용을 위한 외부데이터를 로드 할 때 주로 사용
  - 다른 자바스크립트 라이브러리 또는 프레임워크 함수를 호출
  - DOM을 사용해야 하는 외부 라이브러리 연동
  - 이벤트 등록, `setTimeout`, `setInterval`, 네트워크 요청 같은 비동기 작업
  - `axios`, `fetch` 등을 통하여 ajax 요청을 하거나 DOM의 속성을 읽거나 직접 변경하는 작업  

#### Update(업데이트)
> props가 바뀔 때
>
> state가 바뀔 때
>
> 부모 컴포넌트가 리렌더링 될 때
>
> `this.forceUpdate`로 강제로 렌더링을 트리거 할 때

<p align='center'><img src="https://thebook.io/img/080203/174.jpg" width='300'><br> 업데이트시 호출하는 메서드</p>

##### getDerivedStateFromProps
- 위에 서술한 바와 같이 컴포넌트가 리렌더링(업데이트) 될 때마다 매번 실행된다.

##### shouldComponentUpdate
- 컴포넌트가 리렌더링 할지 말지를 결정하는 메서드
  - true 반환 : 다음 라이프사이클 메서드를 계속 실행
  - false 반환 : 작업을 중지(리렌더링x)
- 주로 최적화 할 때 사용하는 메서드. 함수형 컴포넌트에서 `React.memo`와 비슷한 역할 (불필요한 리렌더링 방지)
- 리액트 공식문서에서는 이 메서드보다는 `PureComponent` 사용을 권장함
  ```javascript
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    // 숫자의 마지막 자리가 4면 리렌더링하지 않습니다
    return nextState.number % 10 !== 4;
  }
  ```
##### render
- UI를 렌더링 하는 메서드, 변경된 내용을 화면에 보여줘야 하므로 업데이트 시에도 호출된다
  
##### getSnapshotBeforeUpdate
- 컴포넌트의 변화를 DOM에 반영하기 직전에 호출
- 변화가 일어나기 직전의 DOM 상태를 가져와서 특정값을 반환하면 그 다음 발생하는 `componentDidUpdate`함수에서 세 번째 파라미터 `snapshot`값으로 전달됨
- 업데이트 하기 직전의 값을 참고할 일이 있을 때 사용(스크롤바의 위치 유지 등)
- 사용 빈도가 많지는 않지만 함수형 컴포넌트 Hook에서 이 메서드를 대체할 기능이 아직 없다
  ```javascript
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }
  ```

##### componentDidUpdate
- 리렌더링을 마친 후 화면에 원하는 변화가 모두 반영되고 난 뒤 호출되는 메서드
- 3번째 파라미터로 `getSnapshotBeforeUpdate`에서 반환한 값을 조회할 수 있다.
- 업데이트가 끝난 이후이므로, DOM관련 처리를 해도 괜찮다
- `prevProps` 또는 `prevState`를 통해 업데이트 이전에 가졌던 데이터에 접근 가능하다
```javascript
componentDidUpdate(prevProps, prevState, snapshot) {
  console.log("componentDidUpdate", prevProps, prevState);
  if (snapshot) {
    console.log("업데이트 되기 직전 색상: ", snapshot);
  }
}
```

#### Unmount(언마운트)
##### componentWillUnmount
- 컴포넌트가 화면에서 사라지기 직전에 호출되는 메서드
- DOM에 직접 등록했던 이벤트를 제거하고, 만약 `componentDidMount`에서 등록한 `setTimeout`, `setInterval`과 같은 이벤트가 있다면 여기서 `clearTimeout`을 통해 제거해준다.
- 만약 외부 라이브러리를 사용했고, 해당 라이브러리에 `dispose` 기능이 있다면 여기서 호출한다.


## 재사용

## 23.02.02(목)
### 1-21. Context API를 사용한 전역 값 관리
> Inputs.js
>
> Context API를 활용해프로젝트 안에서 전역적으로 사용하는 값을 관리할 수 있다

[코드 확인](https://github.com/chunjaeilu/react-ex-vel.git)

<details>
  <summary>코드 보기</summary>

  ```javascript

  ```
</details>