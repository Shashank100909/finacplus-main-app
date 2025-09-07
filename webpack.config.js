const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

const remoteEntryURL = process.env.MUSIC_LIBRARY_URL || "http://localhost:8081/remoteEntry.js"
module.exports = {
  entry: './src/index.js',
mode: 'production',
devServer: {
  port: 8080,
  static: {
    directory: path.join(__dirname, 'public'),
  },
  hot: true,
  historyApiFallback: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
},
  output: {
    publicPath: 'auto',
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"], 
    },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'main_app',
      remotes: {
        music_library: `music_library@${remoteEntryURL}`,
      },
      shared: { react: { singleton: true , requiredVersion : false}, 'react-dom': { singleton: true, requiredVersion : false} },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};