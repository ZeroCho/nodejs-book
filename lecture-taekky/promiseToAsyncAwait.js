//promise-> async / await으로 막 바꾸면안됨
//async await자체도 promise이기때문에 같이 써야하는 경우가 생김

//async await을 쓰더라도 꼭 promise를 써야하는경우가 있음
//axios라는 promise기반의 http서버통신 라이브러리
import axios from "axios";

const p1 = axios.get("주소1"); //송금
const p2 = axios.get("주소2"); //송금
const p3 = axios.get("주소3"); //송금
const p4 = axios.get("주소4"); //송금
const p5 = axios.get("주소5"); //송금
//p1~p5 실행만 시켜놓고 마지막에 다받아오는 이런 것도 가능 p1~p5가 딴짓인거임
Promise.all([p1, p2, p3, p4, p5])
  .then((results) => {})
  .catch((err) => {
    //하나라도 실패하면 여기로옴 -> promise all을 안쓰는 이유
  });

//p4만 실패하면 promiseall의 경우 catch로 가서 어디가 실패인지 뜨지않음.
//allSettled가 되면 ..
Promise.allSettled([p1, p2, p3, p4, p5])
  .then((results) => {
    //실패한 것만 필터링해서 다시 시도 //results는 배열로 나옴
  })
  .catch((error) => {})
  .finally(() => {
    //then이든 catch든 모두 실행되는 finally .. try / catch문에서도 봤던 finally..
  });

//p.then((데이터) => { 화면그리기 (데이터) })

//콜백 지옥..
//콜백헬이 안좋은 이유.. -> 보기 안좋은것도 있지만
//근본적인 원인은 결과값을 바로 받아야하는것..
//코드가 지저분해지는 결과

axios.get("서버주소1", function (데이터1) {
  axios.get("서버주소2", function (데이터2) {
    axios.get("서버주소3", function (데이터3) {
      ///...
    });
  });
});
