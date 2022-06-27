import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: 'root',
    password: 'nodejsbook',
    database: 'nodebird',
    host: '127.0.0.1',
    dialect: 'mysql' as const,
  },
  test: {
    username: "root",
    password: 'nodejsbook',
    database: "nodebird_test",
    host: "127.0.0.1",
    dialect: "mysql" as const
  },
  production: {
    username: 'root',
    password: 'nodejsbook',
    database: 'nodebird',
    host: '127.0.0.1',
    dialect: 'mysql' as const,
    logging: false,
  },
};
