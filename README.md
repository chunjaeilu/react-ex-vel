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
  - `cleanup` 함수는 렌더링 될 때 이전에 남은 함수를 실행시켜 메모리 누수를 막을 수 있다
  - `cleanup` 함수는 setState나 setTimeout, API 요청과 같은 비동기함수가 작동할 때 조건문을 걸어 언마운트 되었을 때만 실행할 수 있도록 한다
  - 메모리 누수를 막기 위해 useRef로 상태를 관리할 수도 있다.
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
	// App.js
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
  }, [users, username, email]);

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
- 
---
	<details>
  	<summary>코드 보기</summary>
    
  	```javascript
  	```
	</details>
