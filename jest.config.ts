const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // dir:'./src'
});
const jestConfig = createJestConfig();

module.exports = jestConfig;
