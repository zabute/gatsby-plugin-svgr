exports.modifyWebpackConfig = ({ config }, options) => {
  const { plugins, ...svgrOptions } = options

  const urlQuery = {
    limit: 10000,
    name: 'static/[name].[hash:8].[ext]',
  }

  config.removeLoader('url-loader')
  config.loader('url-loader', {
    test: /\.(jpg|jpeg|png|gif|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
    loader: 'url',
    query: urlQuery,
  })

  config.loader('svgr', {
    test: /\.svg$/,
    loaders: [
      `babel-loader?${JSON.stringify({
        presets: ['env', 'react', 'stage-0'],
      })}`,
      `@svgr/webpack?${JSON.stringify(svgrOptions)}`,
      `url?${JSON.stringify(urlQuery)}`,
    ],
  })

  return config
}
