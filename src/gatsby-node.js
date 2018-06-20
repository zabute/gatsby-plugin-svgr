const resolve = module => require.resolve(module)

exports.onCreateWebpackConfig = (
  { getConfig, actions, stage, loaders },
  { plugins, ...svgrOptions }
) => {
  const { replaceWebpackConfig, setWebpackConfig } = actions
  const existingConfig = getConfig()

  // remove svg from rule that handles images
  existingConfig.module.rules.map(x => {
    if (
      String(x.test) === String(/\.(ico|svg|jpg|jpeg|png|gif|webp)(\?.*)?$/)
    ) {
      const y = x
      y.test = /\.(ico|jpg|jpeg|png|gif|webp)(\?.*)?$/
      return y
    }

    return x
  })

  replaceWebpackConfig({ ...existingConfig })
  const svgrLoader = {
    loader: resolve(`@svgr/webpack`),
    options: svgrOptions,
  }

  // add new svg rule
  const svgrRule = {
    test: /\.svg$/,
    use: [svgrLoader, loaders.url({ name: 'static/[name].[hash:8].[ext]' })],
  }

  let configRules = []

  switch (stage) {
    case `develop`:
    case `build-javascript`:
    case `build-html`:
    case `develop-html`:
      configRules = configRules.concat([svgrRule])
      break
    default:
  }

  setWebpackConfig({
    module: {
      rules: configRules,
    },
  })
}
