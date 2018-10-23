const resolve = module => require.resolve(module)

exports.onCreateWebpackConfig = (
  { getConfig, actions, stage, loaders },
  { plugins, ...svgrOptions }
) => {
  const { replaceWebpackConfig, setWebpackConfig } = actions
  const existingConfig = getConfig()

  const rules = existingConfig.module.rules.map(rule => {
    if(
      String(rule.test) === String(/\.(ico|svg|jpg|jpeg|png|gif|webp)(\?.*)?$/)
    ) {
      return {
        ...rule,
        issuer: {
          test: /\.(?!(js|jsx|ts|tsx)$)([^.]+$)/,
        }
      }
    }

    return rule
  })

  replaceWebpackConfig({
    ...existingConfig,
    module: {
      ...existingConfig.module,
      rules
    }
  })

  const svgrLoader = {
    loader: resolve(`@svgr/webpack`),
    options: svgrOptions,
  }

  // add new svg rule
  const svgrRule = {
    test: /\.svg$/,
    use: [svgrLoader, loaders.url({ name: 'static/[name].[hash:8].[ext]' })],
    issuer: {
      test: /\.(js|jsx|ts|tsx)$/
    },
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
