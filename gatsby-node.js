const resolve = (module) => require.resolve(module)

exports.onCreateWebpackConfig = (
  { getConfig, actions, stage, loaders },
  {
    plugins,
    include,
    exclude,
    originalGatsbyImagesRuleTest = /\.(ico|svg|jpg|jpeg|png|gif|webp|avif)(\?.*)?$/,
    newGatsbyImagesRuleTest  = /\.(ico|jpg|jpeg|png|gif|webp|avif)(\?.*)?$/,
    nonJsRuleIssuer = { and: [/\.(?!(js|jsx|ts|tsx)$)([^.]+$)/] },
    svgrRuleIssuer = { and: [/\.(js|jsx|ts|tsx)$/] },
    ...svgrOptions
  }
) => {
  const { replaceWebpackConfig, setWebpackConfig } = actions
  const existingConfig = getConfig()

  const rules = existingConfig.module.rules.map((rule) => {
    // see: https://github.com/gatsbyjs/gatsby/blob/18482b123ec87e76cdc738180a1314ea81ad7afa/packages/gatsby/src/utils/webpack-utils.ts#L556
    if (String(rule.test) === String(originalGatsbyImagesRuleTest)) {
      return {
        ...rule,
        test: newGatsbyImagesRuleTest,
      }
    }

    return rule
  })

  replaceWebpackConfig({
    ...existingConfig,
    module: {
      ...existingConfig.module,
      rules,
    },
  })

  const urlLoader = loaders.url({ 
    name: "static/[name].[hash:8].[ext]",
    limit: 10000,
  })

  // for non-javascript issuers
  const nonJs = {
    test: /\.svg$/,
    use: [urlLoader],
    issuer: nonJsRuleIssuer,
  }

  const svgrLoader = {
    loader: resolve(`@svgr/webpack`),
    options: svgrOptions,
  }

  // add new svg rule
  const svgrRule = {
    test: /\.svg$/,
    use: [svgrLoader, urlLoader],
    issuer: svgrRuleIssuer,
    include,
    exclude,
  }

  // for excluded assets
  const excludedRule = {
    test: /\.svg$/,
    use: urlLoader,
    issuer: svgrRule.issuer,
    include: exclude,
    exclude: include,
  }

  let configRules = []

  switch (stage) {
    case `develop`:
    case `build-javascript`:
    case `build-html`:
    case `develop-html`:
      if (include || exclude) {
        configRules = configRules.concat([excludedRule])
      }

      configRules = configRules.concat([nonJs, svgrRule])
      break
    default:
  }

  setWebpackConfig({
    module: {
      rules: configRules,
    },
  })
}
