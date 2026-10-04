const { defaults: tsjPreset } = require('ts-jest/presets')

const defaults = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  testURL: 'http://localhost',
}

const NORMAL_TEST_FOLDERS = ['components', 'hooks', 'integration', 'utils']

const tsTestFolderPath = (folderName) =>
  `<rootDir>/test/${folderName}/**/*.{ts,tsx}`

const tsStandardConfig = {
  ...defaults,
  displayName: 'ReactDOM 19 (Shim)',
  preset: 'ts-jest',
  testMatch: NORMAL_TEST_FOLDERS.map(tsTestFolderPath),
}

const rnConfig = {
  ...defaults,
  displayName: 'React Native',
  testMatch: [tsTestFolderPath('react-native')],
  preset: 'react-native',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    ...tsjPreset.transform,
  },
  // react-native 0.64 ships a renderer built for React 17 internals
  // (ReactCurrentOwner); it cannot run against React 18+/19.
  moduleNameMapper: {
    '^react$': 'react-17',
    '^react-test-renderer$': 'react-test-renderer-17',
  },
}

const standardReact17Config = {
  ...tsStandardConfig,
  displayName: 'ReactDOM 17',
  moduleNameMapper: {
    '^react$': 'react-17',
    '^react-dom$': 'react-dom-17',
    '^react-dom/(.*)$': 'react-dom-17/$1',
    '^react-is$': 'react-is-17',
    '^react-test-renderer$': 'react-test-renderer-17',
    '^@testing-library/react$': '@testing-library/react-12',
  },
}

const standardReact18Config = {
  ...tsStandardConfig,
  displayName: 'ReactDOM 18',
  moduleNameMapper: {
    '^react$': 'react-18',
    '^react-dom$': 'react-dom-18',
    '^react-dom/(.*)$': 'react-dom-18/$1',
    '^react-is$': 'react-is-18',
    '^react-test-renderer$': 'react-test-renderer-18',
    '^@testing-library/react$': '@testing-library/react-18',
  },
}

const nextEntryConfig = {
  ...tsStandardConfig,
  displayName: 'ReactDOM 19 (Next)',
  moduleNameMapper: {
    '../../src/index': '<rootDir>/src/next',
  },
}

module.exports = {
  projects: [
    tsStandardConfig,
    rnConfig,
    standardReact17Config,
    standardReact18Config,
    nextEntryConfig,
  ],
}
