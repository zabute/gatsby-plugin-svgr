# gatsby-plugin-svgr [![npm version](https://badge.fury.io/js/gatsby-plugin-svgr.svg)](https://badge.fury.io/js/gatsby-plugin-svgr)

[SVGR](https://github.com/smooth-code/svgr) plugin for [Gatsby](https://www.gatsbyjs.org)

> These are the docs for `v1.x.x`. The docs for `v0.x.x` are [here](https://github.com/zabute/gatsby-plugin-svgr/tree/v0.x)

## Installing

```console
$ npm install gatsby-plugin-svgr
```
or
```console
$ yarn add gatsby-plugin-svgr
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
