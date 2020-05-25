function getUser() { // 로딩 시 사용자 가져오는 함수
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      var users = JSON.parse(xhr.responseText);
      var list = document.getElementById('list');
      list.innerHTML = '';
      Object.keys(users).map(function (key) {
        var userDiv = document.createElement('div');
        var span = document.createElement('span');
        span.textContent = users[key];
        var edit = document.createElement('button');
        edit.textContent = '수정';
        edit.addEventListener('click', function () { // 수정 버튼 클릭
          var name = prompt('바꿀 이름을 입력하세요');
          if (!name) {
            return alert('이름을 반드시 입력하셔야 합니다');
          }
          var xhr = new XMLHttpRequest();
          xhr.onload = function () {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
              getUser();
            } else {
              console.error(xhr.responseText);
            }
          };
          xhr.open('PUT', '/users/' + key);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify({ name: name }));
        });
        var remove = document.createElement('button');
        remove.textContent = '삭제';
        remove.addEventListener('click', function () { // 삭제 버튼 클릭
          var xhr = new XMLHttpRequest();
          xhr.onload = function () {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
              getUser();
            } else {
              console.error(xhr.responseText);
            }
          };
          xhr.open('DELETE', '/users/' + key);
          xhr.send();
        });
        userDiv.appendChild(span);
        userDiv.appendChild(edit);
        userDiv.appendChild(remove);
        list.appendChild(userDiv);
      });
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('GET', '/users');
  xhr.send();
}
window.onload = getUser; // 로딩 시 getUser 호출
// 폼 제출
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  var name = e.target.username.value;
  if (!name) {
    return alert('이름을 입력하세요');
  }
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 201) {
      console.log(xhr.responseText);
      getUser();
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('POST', '/users');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ name: name }));
  e.target.username.value = '';
});
