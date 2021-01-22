module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  transform: {
    '^.+\\.(ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  },
  coverageReporters: ['json-summary', 'lcov', 'text-summary'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!<rootDir>/node_modules/'],
  coverageThreshold: {
    global: {
      statements: 10,
      branches: 0,
      functions: 10,
      lines: 10
    }
  }
};
