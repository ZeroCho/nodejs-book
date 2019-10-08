function findAndSaveUser(Users) {
  Users.findOne({}, (err, user) => { // 첫 번째 콜백
    if (err) {
      return console.error(err);
    }
    user.name = 'zero';
    user.save((err) => { // 두 번째 콜백
      if (err) {
        return console.error(err);
      }
      Users.findOne({ gender: 'm' }, (err, user) => { // 세 번째 콜백
        // 생략
      });
    });
  });
}
