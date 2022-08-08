# React

## 1. 간단한 일기장 프로젝트

### 1) React에서 사용자 입력 처리하기
- 변수 배열에 담았을 때
- 객체로 담았을 때 (onChange 안에서 setState를 불러올 때 ...state 스프레드 연산자로 가져올 수 있음)

### 2) React에서 DOM 조작하기 
- useRef

### 3) 배열사용하기1 - 리스트 렌더링(조회)
- diaryList 컴포넌트 만들고,
- 배열을 prop 으로 전달 받아
- map 내장함수를 이용해 list 형태로 렌더링
- 렌더링된 아이템을 별도로 item 컴포넌트로 만듬

### 4) 배열사용하기2 - 데이터 추가하기

### 5) 배열사용하기3- 데이터 삭제하기

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

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### 9) 최적화3 - React.memo
- 컴포넌트 결과 값을 memoized
- 컴포넌트 최적화 해야하는 이유 : 이벤트가 발생한 부분만 리렌더링 되게 하기 위해서
- 렌더링 되는 조건 : 본인이 가진 state가 변경될 때 / 자신이 받은 prop이 변경될 때 / 부모컴포넌트가 리렌더링

### 10) 최적화4
- DiaryItem  React.memo 묶어주기
- App(onRemove, onEdit) : useCallback 하고, setData에 인자는 data로 받고, 함수형으로 업데이트 하도록 지시

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Learn More
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).
