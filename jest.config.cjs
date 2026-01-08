/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/dist-tests/**/*.test.js"],
  setupFiles: ["<rootDir>/dist-tests/tests/setup.js"],
  transform: {}, // no ts-jest; tests are compiled by tsc
};
