# gatsby-plugin-svgr [![npm version](https://badge.fury.io/js/gatsby-plugin-svgr.svg)](https://badge.fury.io/js/gatsby-plugin-svgr)

[SVGR](https://github.com/smooth-code/svgr) plugin for [Gatsby v2.0+](https://www.gatsbyjs.org). Still rocking Gatsby v1?  [See the v1 branch](https://github.com/zabute/gatsby-plugin-svgr/tree/v1) instead.


## Installing

As of v2.0, SVGR is declared as a [peer dependency](https://nodejs.org/en/blog/npm/peer-dependencies/). You will need to add `gatsby-plugin-svgr` as well as `@svgr/webpack` to your dependencies.

```shell
$ npm install @svgr/webpack gatsby-plugin-svgr
```
or
```shell
$ yarn add @svgr/webpack gatsby-plugin-svgr
```

## Setup

### Add it to your `gatsby-config.js`

```js
module.exports = {
  plugins: [
    'gatsby-plugin-svgr',
  ],
}
```

### Options

**Note: If you need to configure SVGO, [we recommended this approach](https://github.com/zabute/gatsby-plugin-svgr/issues/38#issuecomment-494601002) instead of the below.** Documentation update to follow.

Any options you configure `gatsby-plugin-svgr` with will be passed on to `svgr` with the exception of `include` and `exclude` (see below). You can [see a full list of SVGR options here](https://github.com/smooth-code/svgr#options) (you want the API override version). SVGR uses [SVGO](https://github.com/svg/svgo) to optimize SVGs; you can configure SVGO using `svgoConfig`; [see SVGO for a full list of configuration options](https://github.com/svg/svgo#what-it-can-do).

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        prettier: true,          // use prettier to format JS code output (default)
        svgo: true,              // use svgo to optimize SVGs (default)
        svgoConfig: {
          plugins: [
            { removeViewBox: true }, // remove viewBox when possible (default)
            { cleanupIDs: true },    // remove unused IDs and minify remaining IDs (default)
          ],
        },
      },
    },
  ],
}
```

**Note**: SVGO does not produce unique IDs when using the `cleanupIDs` option; if you're using SVGs that rely on IDs (e.g. to target template elements with `use`) and include multiple SVGs on the same page you may wish to disable the `cleanupIDs` option to prevent conflicts. Alternately you can disable `svgo` altogether and perform any optimization either manually or through another build process.

### Applying SVGR to only some resources

By default, SVGR is only used to load resources when loaded via JS (i.e. your stylesheets will fallback to the default loader). If you only want to apply SVGR to some resources, or you want to exclude some resources, you can pass `include` or `exclude` as options. These are passed directly to the SVGR loader as [Conditions](https://webpack.js.org/configuration/module/#condition).

```js
{
  resolve: 'gatsby-plugin-svgr',
  options: {
    exclude: /some_special_folder/,
  },
}
```

### More flexible Options

Due to the constant iteration of webpack and gatsby, and to accommodate some unknown usage scenarios, we have added several new options:  

- **originalGatsbyImagesRuleTest**: `RegExp`

The principle of this plugin is to find gatsby's original webpack rule for handling images and remove the `svg` from its *test* property. For example, the current images rule is defined [here](https://github.com/gatsbyjs/gatsby/blob/18482b123ec87e76cdc738180a1314ea81ad7afa/packages/gatsby/src/utils/webpack-utils.ts#L556).

So we use the **originalGatsbyImagesRuleTest** to find the original images rule.

The default value is: `/\.(ico|svg|jpg|jpeg|png|gif|webp|avif)(\?.*)?$/`.

- **newGatsbyImagesRuleTest**: `RegExp`

After we find the original rule, we need to replace its test property, so we need **newGatsbyImagesRuleTest**. 

The default value is: `/\.(ico|jpg|jpeg|png|gif|webp|avif)(\?.*)?$/`.

- **nonJsRuleIssuer**: [Condition](https://v4.webpack.js.org/configuration/module/#condition)

We decide whether to use `@svgr/webpack` for svg files based on [webpack Rule.issuer](https://v4.webpack.js.org/configuration/module/#ruleissuer). If file matches with **nonJsRuleIssuer**, we won't use `@svgr/webpack`. 

The default value is:  
```js
{
  and: [/\.(?!(js|jsx|ts|tsx)$)([^.]+$)/]
}
```

**Note**: The [webpack v4, webpack Rule.issuer](https://v4.webpack.js.org/configuration/module/#condition) and [webpack v5, webpack Rule.issuer](https://webpack.js.org/configuration/module/#ruleissuer) have different types. For example, `test` property is not supported in [webpack v5, webpack Rule.issuer](https://webpack.js.org/configuration/module/#ruleissuer).

- **svgrRuleIssuer**: [Condition](https://v4.webpack.js.org/configuration/module/#condition)

Opposite of **nonJsRuleIssuer**, If file matches with **svgrRuleIssuer**, we will use `@svgr/webpack`. 

The default value is:  
```js
{
  and: [/\.(js|jsx|ts|tsx)$/]
}
```

## Usage

```jsx
import starUrl, { ReactComponent as Star } from './star.svg'

const App = () => (
  <div>
    <img src={starUrl} alt="star" />
    <Star />
  </div>
)
```

## FAQ

1. How to use in [docz](https://github.com/doczjs/docz)

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        nonJsRuleIssuer: {
          and: [/\.(?!(js|jsx|ts|tsx|mdx)$)([^.]+$)/]
        },
        svgrRuleIssuer: {
          and: [/\.(js|jsx|ts|tsx|mdx)$/]
        }
      },
    },
  ],
}
```

2. How to use in gatsby < 2.30

Since gatsby 2.30 change `rules.images.test` from `/\.(ico|svg|jpg|jpeg|png|gif|webp)(\?.*)?$/` to `/\.(ico|svg|jpg|jpeg|png|gif|webp|avif)(\?.*)?$/` in this [commit](https://github.com/gatsbyjs/gatsby/commit/1a592001eecee463b25a0ec599c2223956066905#diff-7248a36a4e059302efa6b2ef2df31e56e0a9ef05fab0404498bff755264fe623). 

If you want to use it in gatsby < 2.30, you should use the following config:  

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        originalGatsbyImagesRuleTest: /\.(ico|svg|jpg|jpeg|png|gif|webp)(\?.*)?$/,
        newGatsbyImagesRuleTest: /\.(ico|jpg|jpeg|png|gif|webp)(\?.*)?$/
      },
    },
  ],
}
```