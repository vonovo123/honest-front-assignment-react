### 1.

```javascript
/** 
 * 다음과 같은 코드가 있습니다. 코드의 실행 순서를 설명해주세요.  
   그리고 실행 순서가 왜 그렇게 되는지, 자바스크립트 이벤트 루프 시스템을 통해 설명해주세요.
*/

function noonChiGame() {
  console.log('김어펀 하나');
  console.log('이어펀 둘');
  window.setTimeout(() => console.log('박어펀 둘'), 0);
  console.log('최어펀 셋');
}

noonChiGame();

/**
  실행순서
  1.전역 실행 컨텍스트 평가
  2.전역 실행 컨텍스트 생성 후 콜스텍에 푸시
  3.전역 실행 컨텍스트 실행
  4.noonChiGame 함수 호출 & 평가
  5.noonChiGame 함수 실행 컨텍스트 생성 & 콜스텍에 푸시
  6.noonChiGame 함수 실행
  7.console.log("이어펀 둘") 실행
  8.console.log("이어펀 둘") 실행
  9.window.setTimeout() 실행
  10. 병행처리
  [
    setTimeout의 콜백함수(console.log('박어펀 둘'))는 0ms(실제적으로 최소지연시간 4ms) 이후
    브라우저 또는 Node.js에 의해 테스크큐로 이동하여 대기
    console.log("최어펀 셋") 실행
  ]
  11.콜스택에 실행 컨텍스트가 존재하지 않으면 콜백함수(console.log('박어펀 둘'))는 이벤트 루프에 의해 콜스텍에 푸시
  12.콜백함수(console.log('박어펀 둘')) 실행
 */
```

### 2.

```javascript
/**
  `modifyUserInfoObj` 함수는 사용자 정보 객체를 인자로 받아 사용자 정보의 일부를 변경하여 변경된 객체를 반환하는 함수입니다.
  그런데 코드 실행 결과, `userInfoObj` 객체와 `modifiedUserInfoObj` 객체가 같은 내용을 담고 있습니다.
  `modifyUserInfoObj` 함수가 인자로 받은 객체에 영향을 주지 않고, 새로운 객체를 반환할 수 있게 코드를 고쳐주세요.
*/
function modifyUserInfoObj(userInfoObj) {
  /**
   const modifiedUserInfoObj = userInfoObj;
   참조값을 복사했기 때문에 modifiedUserInfoObj 변수와 userInfoObj 변수는 같은 같은 객체를 참조하고 있다.
   이를 방지하기 위해 스프레드 문법을 통해 객체 내부의 값을 복사해 만든 새로운 객체를 참조한다.
  */
  const modifiedUserInfoObj = { ...userInfoObj };
  modifiedUserInfoObj.name = '박어펀';
  modifiedUserInfoObj.age = 25;
  return modifiedUserInfoObj;
}

const userInfoObj = { name: '김어펀', age: 30, job: 'frontend engineer' };
const modifiedUserInfoObj = modifyUserInfoObj(userInfoObj);

console.log(userInfoObj, modifiedUserInfoObj);
```

### 3.

```javascript
/**
 `fetchAllUserInfo` 함수는 서버와 HTTP 통신(API 요청)을 하여 사용자와 관련된 정보를 얻어오는 일을 합니다.
 `fetchUserName`, `fetchUserLoanInfo`, `checkFraudulentUser` 함수는 모두 Promise 객체를 반환하는 함수라고 가정합니다.
 `fetchAllUserInfo` 함수를 실행하면 1번 도식과 같이 코드가 순차적으로 실행이 될 것 입니다.
  하지만 모든 API 요청을 순차적으로 처리하게 되면, 모든 요청이 끝날 때까지 다른 코드가 실행되지 못하므로 좋지 않은 UX 를 유발하는 등 비효율야기할 수 있습니다.
  `fetchUserName`, `fetchUserLoanInfo`, `checkFraudulentUser` 함수들을 2번 도식과 같이 병렬로 처리하기 위한 방법을 제시해 주세요.
 */

async function fncAllUserInfo(userId) {
  /**
   * Promise.all 메서드는 여러개의 비동기 함수를 병렬처리할때 사용합니다.
   * Promise.all 메서드가 결과를 반환하는데 걸리는 시간은 가장 늦게 fullfilled 상태가 되는 Promise 객체의 시간과 가깝습니다.
   */
  const result = Promise.all([
    fetchUserName(userId),
    checkIsUser(userId),
    fetchUserLoanInfo(userId),
  ]);
  return result;
}
```

### 4.

[구현과제 데모페이지 URL](https://vonovo123.github.io/honest-front-assignment-react/identity-authentication)
