const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "public/app.css",
});

function scriptRules() {
  return [
    {
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: "babel-loader",
      options: { presets: ["@babel/preset-env"] },
    },
  ];
}
function sassRules() {
  return [
    {
      test: /\.(sass|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "sass-loader"],
      }),
    },
  ];
}

module.exports = {
  entry: ["./resources/assets/styles/app.scss", "./resources/assets/js/app.js"],
  output: {
    path: __dirname,
  },
  module: {
    rules: sassRules().concat(scriptRules()),
  },
  plugins: [extractSass],
  watch: true,
  mode: "development",
};
