const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");

const { NODE_ENV = "production" } = process.env;

module.exports = {
  entry: "./src/server/server.ts",
  mode: NODE_ENV,
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "source-map",
  externals: [nodeExternals()],
  plugins: [new NodemonPlugin()],
  watch: NODE_ENV === "development",
};
