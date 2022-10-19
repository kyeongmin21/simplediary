# React
## 1. 간단한 일기장 프로젝트

### 1) React에서 사용자 입력 처리하기
- 변수 배열에 담았을 때
- 객체로 담았을 때 (onChange 안에서 `setState`를 불러올 때 `...state` 스프레드 연산자로 가져올 수 있음)


### 2) React에서 DOM 조작하기
- useRef


### 3) 배열사용하기1 - 리스트 렌더링(조회)
- `diaryList` 컴포넌트 만들고,
- 배열을 prop 으로 전달 받아
- map 내장함수를 이용해 list 형태로 렌더링
- 렌더링된 아이템을 별도로 item 컴포넌트로 만듬


### 4) 배열사용하기2 - 데이터 추가하기
- `App`은 `DiaryEditor` 와 `DiaryList`를 가지고 있다.
- `DiaryList` 는 배열 data만 넘겨주면 된다.
- 일기 작성한 걸 보여주기 위해서는 data 상태를 변화시키면 된다.
- `App.js`에서 `onCreate` 함수를 만듬
- `onCreate`를 `DiaryEditor`에서 props로 받아서 호출하면
  state.author, state.content~~를 App 부모 컴포넌트로 전달한다.
- onCreate가 만들어지면서 `setData`가 업데이트된다.


### 5) 배열사용하기3- 데이터 삭제하기
- App.js에서 `onRemove` 함수를 만듬
- `App.js > DiaryList.js > DiaryItem.js` 순으로 `onRemove` 를 `prop` 으로 내려줌.
- `DiaryItem` 삭제버튼에 `onClick` 이벤트를 걸어주는데 `onRemove`를 호출하면서 `id`를 넘겨준다

### 5) 배열사용하기4- 데이터 수정하기

### 6) useEffect
- Lifecycle: mount / update / unmount
- Open [https://jsonplaceholder.typicode.com/comments](https://jsonplaceholder.typicode.com/) to view it in your browser.


### 7) API 호출하기
- `mount` 시점에 API 호출하는 `getData` 함수를 만들어서
  자바스크립트 내장객체 `fetch`와 `async await` 키워드를 이용해서
  데이터 가공 후, 일기 데이터의 초깃값을 설정해 봄.


### 7) 최적화1 - useMemo
-  성능 최적화를 위하여 연산된 값을 `useMemo` 라는 Hook 을 사용


### 8) 최적화2 - React.memo
- 함수의 결과 값을 memoized
- 고차 컴포넌트 : 함수를 호출해서 매개변수를 컴포넌트로 전달했더니 향상된 컴포넌트가 되었다.
- ex) 마치 가죽을 주면 구두로 만들어서 주겠다!


### 9) 최적화3 - useCallback
- 컴포넌트 결과 값을 memoized
- 컴포넌트 최적화 해야하는 이유 : 이벤트가 발생한 부분만 리렌더링 되게 하기 위해서
- 렌더링 되는 조건 : 본인이 가진 state 가 변경될 때 / 자신이 받은 prop 이 변경될 때 / 부모컴포넌트가 리렌더링
- DiaryEditor 컴포넌트에서 `React.memo` 감싸주어도 리렌더링이 되는데 그 이유가 `{onCreate}` props 로 받아오고 있어서!
- 그래서 `onCreate` 를 막아야 리렌더링이 안된다


### 10) useReducer
- `useState` 의 대체 함수
- `(state, action) => newState`의 형태로 `reducer`를 받고 `dispatch` 메서드와 짝의 형태로 현재 `state`를 반환


### 11) Context - 컴포넌트 트리에 데이터 공급하기
