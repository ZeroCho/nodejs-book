async function findAndSaveUser(Users) {
  let user = await Users.findOne({});
  user.name = 'zero';
  user = await user.save();
  user = await Users.findOne({ gender: 'm' });
  // 생략
}
