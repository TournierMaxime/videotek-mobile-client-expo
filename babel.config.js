module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            tests: ["./tests/"],
            "@modules": "./src/modules",
            "@navigators": "./src/navigators",
            "@redux": "./src/redux",
            "@services": "./src/services",
            "@views": "./src/views",
            "@env": ["node_modules/react-native-dotenv"],
          },
        },
      ],
    ],
  }
}
