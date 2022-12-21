const bcrypt = require('bcrypt');

module.exports = {
  findOne: async ({ where: { email, id } }) => {
    if (email === 'zerohch0@gmail.com' || id === 1) {
      return {
        id: 1,
        email: 'zerohch0@gmail.com',
        password: await bcrypt.hash('nodejsbook', 12),
        Followers: [],
        Followings: [],
        addFollowing() {},
      };
    }
    return null;
  },
  create: async () => {},
};
