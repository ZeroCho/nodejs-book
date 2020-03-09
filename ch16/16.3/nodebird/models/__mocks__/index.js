const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const User = require('../user');
const Post = require('../post');
const Hashtag = require('../hashtag');

const db = {
  sequelize: {
    sync: () => Promise.resolve(),
  },
};
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

module.exports = db;
