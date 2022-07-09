import Sequelize from 'sequelize';
import User from './user';
import configObject from '../config/config';
const config = configObject['test'];
const sequelize = new Sequelize.Sequelize(
  config.database, config.username, config.password, config,
);

describe('User 모델', () => {
  test('static initiate 메서드 호출', () => {
    expect(User.initiate(sequelize)).toBe(undefined);
  });
  test('static associate 메서드 호출', () => {
    expect(User.associate()).toBe(undefined);
  });
});
