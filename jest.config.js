module.exports = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    testEnvironment: "jsdom",
    verbose: true,
    // Hack to avoid NextJS changing jsx to "preserve" with "yarn run dev"
    "globals": {
        "ts-jest": {
            "tsconfig": "./tsconfig.test.json"
        }
    },
}
