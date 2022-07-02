jest.mock('../models/user');
import User from '../models/user';
import { follow } from './user';
import {Request, Response} from 'express';

describe('follow', () => {
  const req = {
    user: { id: 1 },
    params: { id: 2 },
  } as unknown as Request;
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  test('사용자를 찾아 팔로잉을 추가하고 success를 응답해야 함', async () => {
    (User.findOne as jest.Mock).mockReturnValue({
      addFollowing(id: number) {
        return Promise.resolve(true);
      }
    });
    await follow(req, res, next);
    expect(res.send).toBeCalledWith('success');
  });

  test('사용자를 못 찾으면 res.status(404).send(no user)를 호출함', async () => {
    (User.findOne as jest.Mock).mockReturnValue(null);
    await follow(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith('no user');
  });

  test('DB에서 에러가 발생하면 next(error) 호출함', async () => {
    const message = 'DB에러';
    (User.findOne as jest.Mock).mockReturnValue(Promise.reject(message));
    await follow(req, res, next);
    expect(next).toBeCalledWith(message);
  });
});
