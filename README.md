# gatsby-plugin-svgr

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
        semi: false,
        singleQuote: true,
        ref: true,
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
