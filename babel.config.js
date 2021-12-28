module.export = {
  "presets": [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    // "babel-preset-solid",
    // only if you use TS with solid-jest
    // ["@babel/preset-typescript", {
    //   "isTSX": true,
    //   "allExtensions": true,
    // }],
    "@babel/preset-typescript"
  ]
}
