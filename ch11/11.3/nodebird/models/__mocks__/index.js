const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const User = require('../user');
const Post = require('../post');
const Hashtag = require('../hashtag');

const db = {
  sequelize: {
    sync: () => Promise.resolve(),
  },
  User: {
    findOne: async ({ where: { email } }) => {
      if (email === 'zerohch0@gmail.com') {
        return {
          id: 1,
          password: await bcrypt.hash('nodejsbook', 12),
          Followers: [],
          Followings: [],
        };
      }
      return null;
    },
  },
};
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

module.exports = db;
