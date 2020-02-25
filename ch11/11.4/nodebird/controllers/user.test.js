jest.mock('../models/user');
const { addFollowing } = require('../controllers/user');

describe('addFollowing', () => {
  const res = {
    send: jest.fn(),
    status: jest.fn(() => res),
  };
  const next = jest.fn();

  test('사용자를 찾아 팔로잉을 추가하고 success를 응답해야 함', async () => {
    const req = {
      user: { id: 1 },
      params: { id: 2 },
    };
    await addFollowing(req, res, next);
    expect(res.send).toBeCalledWith('success');
  });

  test('사용자를 못 찾으면 next(error)를 호출함', async () => {
    const error = '사용자 못 찾음';
    User.findOne.mockReturnValue(Promise.reject(error));
    await addFollowing(req, res, next);
    expect(next).toBeCalledWith(error);
  });
});
