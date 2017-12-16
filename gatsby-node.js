exports.modifyWebpackConfig = function(webpack, options) {
  webpack.config.loader('url-loader', {
    test: /\.(jpg|jpeg|png|gif|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
    loader: 'url',
    query: {
      limit: 10000,
      name: 'static/[name].[hash:8].[ext]',
    },
  });

  webpack.config.loader('svgr', {
    test: /\.svg$/,
    include: /src/,
    loaders: ['babel-loader', `svgr/webpack?${JSON.stringify(options)}`],
  });

  return webpack.config;
};
