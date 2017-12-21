# gatsby-plugin-svgr [![npm version](https://badge.fury.io/js/gatsby-plugin-svgr.svg)](https://badge.fury.io/js/gatsby-plugin-svgr)

[svgr](https://github.com/smooth-code/svgr) plugin for [gatsby](https://www.gatsbyjs.org/)

## Installing
```
  $ npm install gatsby-plugin-svgr
```
or

```
  $ yarn add gatsby-plugin-svgr
```

## Using
  #### Add it to your ```gatsby-config.js```
  ```js
  // gatsby-config.js

  module.exports = {
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        dir: '/some/path' // only process this directory
        // svgr options
        icon: true,
        viewBox: false,
        // see https://github.com/smooth-code/svgr for a list of all options
      },
    },
  }
```
  #### Add a ```.babelrc``` to the root of your project

  ```json
  {
    "presets" : ["env", "react", "stage-0"]
  }
  ```

  #### Import your SVGs and render them as you would any React component

  ```jsx
  import Svg from 'path/to/svg/file.svg';
  import AnotherSvg from 'path/to/another/svg/file.svg';

  <Svg/>
  <AnotherSvg/>
  ```
