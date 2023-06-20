module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "@babel/plugin-transform-react-jsx",
        {
          runtime: "automatic",
        },
      ],
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            /*
             * Regular expression is used to match all files inside `./src` directory and map each `.src/folder/[..]` to `~folder/[..]` path
             */
            "@assets": "./assets",
            "@env": "./env",
            "@apis": "./apis",
            "@components": "./components",
            "@configs": "./configs",
            "@layouts": "./layouts",
            "@screens": "./screens",
            "@services": "./services",
            "@utils": "./utils",
            "@hooks": "./hooks",
            "@types": "./types",
            "@states": "./states",
            "@styles": "./styles",
          },
          extensions: [
            ".ios.js",
            ".android.js",
            ".js",
            ".jsx",
            ".json",
            ".tsx",
            ".ts",
            ".native.js",
          ],
        },
      ],
    ],
  };
};
