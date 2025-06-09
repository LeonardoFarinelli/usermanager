module.exports = {
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
      "/node_modules/(?!(axios)/)" // Permite transformar axios dentro do node_modules
    ],
    transform: {
      "^.+\\.[jt]sx?$": "babel-jest" // Usa babel-jest pra transformar JS/TS
    },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"]
  };