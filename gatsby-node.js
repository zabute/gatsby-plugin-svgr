exports.modifyWebpackConfig = ({ config }, options) => {
  const { plugins, dir, ...svgrOptions } = options;

  // remove gatsby's url-loader loader for svgs
  config.removeLoader('url-loader');
  config.loader('url-loader', {
    test: /\.(jpg|jpeg|png|gif|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
    loader: 'url',
    query: {
      limit: 10000,
      name: 'static/[name].[hash:8].[ext]',
    },
  });

  // only use svgr's loader for svgs in 'dir' if specified
  config.loader('svgr', {
    test: /\.svg$/,
    include: dir && new RegExp(dir),
    loaders: [
      'babel-loader',
      `svgr/webpack?${JSON.stringify(svgrOptions)}`,
    ],
  });

  if (dir) {
    config.loader('svg-url', {
      test: /\.svg$/,
      exclude: new RegExp(dir),
      loader: 'url',
      query: {
        limit: 10000,
        name: 'static/[name].[hash:8].[ext]',
      },
    });
  }

  return config;
};
