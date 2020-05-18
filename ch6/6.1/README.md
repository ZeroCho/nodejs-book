# 6.1 Express-generator로 빠르게 설치하기

`express-generator`는 express framework에 필요한 package.json을 만들어주고 기본 폴더까지 잡아주는 패키지이다.
`express-generator`는 console 명령어이기 때문에 npm 전역 설치가 필요하다.
```shell script
# express-generator 설치
npm i -g express-generator
# express project 생성
# pug을 사용하려면 [옵션]에 --view=pug
# ejs를 사용하려면 [옵션]에 --view=ejs
express <프로젝트 이름> [옵션]
```

## 파일 구성
`app.js` : 핵심적인 서버 역할  
`bin/www` : 서버를 실행하는 스크립트  
`public` : 외부(브라우저 등의 클라이언트)에서 접근 가능한 파일들 (이미지, 자바스크립트, CSS 파일 등)  
`routes` : 주소별 라우터들을 모아둔 곳  
`views` : 템플릿 파일을 모아둔 곳  

