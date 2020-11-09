export default {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  modulePaths: ["<rootDir>"],
  testMatch: [
    "**/__tests__/**/*.test.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).test.+(ts|tsx|js)",
  ],
  transform: { "\\.tsx?$": ["ts-jest"] },
  resetMocks: true,
  verbose: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "svg"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-(native|universal|navigation)-(.*)|@react-native-community/(.*)|@react-navigation/(.*)|bs-platform|@ui-kitten)",
  ],
  setupFilesAfterEnv: ["./jestSetup.js"],
};
