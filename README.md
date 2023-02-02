# 리액트 실습 노트
패스트캠퍼스에서 제공하는 리액트 온라인 강의 교재를 따라가면서 실습한 내용을 날짜별로 기록한다

앞선 기초문법은 선행하였으므로 1-09강부터 기록


https://react.vlpt.us/

## 23.01.31(화)
### 여러개의 input 상태관리
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

### useRef로 컴포넌트 안의 변수 관리하기
> UserList2.js, CreateUser.js
>
> useRef를 활용해 컴포넌트 안의 변수를 생성

- `useRef`Hook은 DOM을 선택하는 것 외에 컴포넌트 안에서 조회 및 수정할 수 있는 변수를 관리하는 기능이 있다. 
- useRef로 관리되는 변수는 값이 바뀌어도 컴포넌트가 리렌더링 되지 않는다.
- 리액트 컴포넌트에서 변수의 상태를 변경하는 함수를 호출하고 나서 리렌더링 이후에 업데이트된 상태를 조회할 수 있으나, useRef로 관리되는 변수는 렌더링 없이 설정 후 바로 조회할 수 있다.
- Ref로 관리할 변수 생성 : `const nextId = useRef(4);`

### 배열에 항목 추가하기
> UserList2.js, CreateUser.js
>
> 스프레드 연산자로 배열에 새로운 항목 추가 (Create)
> Create함수 props로 전달하고 자식 컴포넌트에서 항목 추가 요청
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

### 배열에서 항목 제거하기
> UserList2.js
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
### 배열 항목 수정하기
> UserList2.js
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
  
### useEffect Hook
> UserList2.js
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

### useMemo Hook
> App.js >> countActiveUsers 컴포넌트
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

### useCallback Hook
> App.js
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

### React.memo 함수
> App.js, CreateUser.js, UserList2.js
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
### useReducer Hook
> Counter.js, App.js
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


### 커스텀 Hooks 만들기
> useInputs.js, App.js
>
> 컴포넌트에서 반복되는 로직을 커스텀 Hooks로 만들어 쉽게 재사용 할 수 있다.

- 커스텀 Hooks는 src 디렉토리에 hooks 라는 디렉토리를 만들고, 그 안에 useSomething.js 파일로 관리한다.

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

## 재사용

## 23.02.02(목)
### 커스텀 Hooks 만들기
> Inputs.js
>
> 컴포넌트에서 반복되는 로직을 커스텀 Hooks로 만들어 쉽게 재사용 할 수 

<details>
  <summary>코드 보기</summary>

  ```javascript

  ```
</details>