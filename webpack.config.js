const HtmlPlugin = require('html-webpack-plugin');
const webpack= require('webpack');
//wepack file gets the entry and shows output in different folder
module.exports = {
  
  entry: './client',
  
  output: {
    filename: 'bundle.js',
    path: 'dist'
  },
  
  devtool: 'inline-source-map',
  
  //this have which files are all to convert
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ["react-hot-loader", "babel-loader"]
    },
    {
                test: /\.css$/,
                loader:"style-loader!css-loader",
                include: [/flexboxgrid/,/react-select/]
              }]
  },
   
  plugins: [
    new HtmlPlugin({
      template: 'public/index.html'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  ]
}