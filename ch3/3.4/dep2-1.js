const dep1 = require('./dep1-1');
console.log('require dep1', dep1);
exports.dep2 = () => {
  console.log('dep1', dep1);
};
