const { PHASE_DEVELOPMENT_SERVER } = require('next/constants'); //nodeJS import syntax: ;

module.exports = (phase) => {
  //nodeJS中類似export default語法
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'abcdb6586',
        mongodb_password: 'FYRo01IO5m7D7Otd',
        mongodb_clustername: 'cluster0',
        mongodb_databaase: 'my-site-dev',
      },
    };
  }
  return {
    env: {
      mongodb_username: 'abcdb6586',
      mongodb_password: 'FYRo01IO5m7D7Otd',
      mongodb_clustername: 'cluster0',
      mongodb_databaase: 'my-site',
    },
  };
};
