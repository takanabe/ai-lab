import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/src/lib/jest.setup.ts'],
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
};

export default config;
