import bcrypt from 'bcrypt';

export default {
  findOne: async ({where: {email, id}}: { where: { email: string, id: number } }) => {
    if (email === 'zerohch0@gmail.com' || id === 1) {
      return {
        id: 1,
        email: 'zerohch0@gmail.com',
        password: await bcrypt.hash('nodejsbook', 12),
        Followers: [],
        Followings: [],
        addFollowing() {
        },
        mockReturnValue(value: any) {},
      };
    }
    return {
      mockReturnValue(value: any) {},
    };
  },
  create: async () => {
  },
};
