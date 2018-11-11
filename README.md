# gatsby-plugin-svgr [![npm version](https://badge.fury.io/js/gatsby-plugin-svgr.svg)](https://badge.fury.io/js/gatsby-plugin-svgr)

[SVGR](https://github.com/smooth-code/svgr) plugin for [Gatsby](https://www.gatsbyjs.org)

> **Note**: The master branch contains the Gatsbyjs V2 compatible version of this plugin. Work on the Gatsbyjs v1 compatible version is on-going in the [v1](https://github.com/zabute/gatsby-plugin-svgr/tree/v1) branch.

## Installing

```console
$ npm install svgr gatsby-plugin-svgr
```
or
```console
$ yarn add svgr gatsby-plugin-svgr
```

## Setup

### Add it to your `gatsby-config.js`

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        icon: true,
        viewBox: false,
        // see https://github.com/smooth-code/svgr for a list of all options
      },
    },
  ],
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
