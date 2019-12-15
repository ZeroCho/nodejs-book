const dep2 = require('./dep2-1');
console.log('require dep2', dep2);
exports.dep1 = () => {
  console.log('dep2', dep2);
};
