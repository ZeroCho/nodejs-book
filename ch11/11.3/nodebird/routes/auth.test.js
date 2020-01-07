const request = require('supertest');
const app = require('../app');

describe('POST /join', () => {
  test('로그인했으면 redirect /', (done) => {
    request(app)
      .post('/auth/join')
      .auth('username', 'password')
      .expect(301, done);
  });
});

describe('POST /login', () => {
  test('로그인 수행', (done) => {
    request(app)
      .post('/auth/login')
      .send({
        email: 'zerohch0@gmail.com',
        password: 'nodejsbook',
      })
      .expect(301, done);
  });
});
