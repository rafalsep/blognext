module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['app/**/*.js', '!app/**/*.spec.js', '!app/**/*.index.js'],
  // coverageThreshold: {
  //   global: {
  //     statements: 50,
  //     branches: 50,
  //     functions: 50,
  //     lines: 50
  //   }
  // },
  coverageReporters: ['lcov', 'text-summary'],
  moduleDirectories: ['node_modules', 'app'],
  moduleFileExtensions: ['js'],
  cacheDirectory: './tmp/test-cache',
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/jest/jestCssModuleMock.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/jestImageMock.js'
  },
  setupTestFrameworkScriptFile: '<rootDir>/jest/validateProps.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: ['<rootDir>/app/**/__test__/**/*.spec.js'],
  roots: ['<rootDir>'],
  setupFiles: ['<rootDir>/jest/test-setup.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/']
};
