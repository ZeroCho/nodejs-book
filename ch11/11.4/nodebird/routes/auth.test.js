const request = require('supertest');
const { sequelize } = require('../models');
const app = require('../app');

beforeAll(async () => {
  await sequelize.sync();
});

describe('POST /join', () => {
  test('로그인 안 했으면 가입', (done) => {
    request(app)
      .post('/auth/join')
      .send({
        email: 'zerohch0@gmail.com',
        nick: 'zerocho',
        password: 'nodejsbook',
      })
      .expect('Location', '/')
      .expect(302, done);
  });
});

describe('POST /login', () => {
  const agent = request.agent(app);
  beforeEach((done) => {
    agent
      .post('/auth/login')
      .send({
        email: 'zerohch0@gmail.com',
        password: 'nodejsbook',
      })
      .end(done);
  });

  test('이미 로그인했으면 redirect /', (done) => {
    const message = encodeURIComponent('로그인한 상태입니다.');
    agent
      .post('/auth/join')
      .send({
        email: 'zerohch0@gmail.com',
        nick: 'zerocho',
        password: 'nodejsbook',
      })
      .expect('Location', `/?error=${message}`)
      .expect(302, done);
  });
});

describe('POST /login', () => {
  test('가입되지 않은 회원', (done) => {
    const message = encodeURIComponent('가입되지 않은 회원입니다.');
    request(app)
      .post('/auth/login')
      .send({
        email: 'zerohch1@gmail.com',
        password: 'nodejsbook',
      })
      .expect('Location', `/?loginError=${message}`)
      .expect(302, done);
  });

  test('로그인 수행', (done) => {
    request(app)
      .post('/auth/login')
      .send({
        email: 'zerohch0@gmail.com',
        password: 'nodejsbook',
      })
      .expect('Location', '/')
      .expect(302, done);
  });

  test('비밀번호 틀림', (done) => {
    const message = encodeURIComponent('비밀번호가 일치하지 않습니다.');
    request(app)
      .post('/auth/login')
      .send({
        email: 'zerohch0@gmail.com',
        password: 'wrong',
      })
      .expect('Location', `/?loginError=${message}`)
      .expect(302, done);
  });
});

describe('GET /logout', () => {
  test('로그인 되어있지 않으면 403', (done) => {
    request(app)
      .get('/auth/logout')
      .expect(403, done);
  });

  const agent = request.agent(app);
  beforeEach((done) => {
    agent
      .post('/auth/login')
      .send({
        email: 'zerohch0@gmail.com',
        password: 'nodejsbook',
      })
      .end(done);
  });

  test('로그아웃 수행', (done) => {
    agent
      .get('/auth/logout')
      .expect('Location', `/`)
      .expect(302, done);
  });
});

afterAll(async () => {
  await sequelize.sync({ force: true });
});
