# TailwindCSS Grid Names

[![Latest Version on NPM](https://img.shields.io/npm/v/@savvywombat/tailwindcss-grid-named-lines)](https://www.npmjs.com/package/@savvywombat/tailwindcss-grid-named-lines)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/SavvyWombat/tailwindcss-grid-named-lines/blob/main/LICENSE)
[![Build](https://img.shields.io/github/workflow/status/SavvyWombat/tailwindcss-grid-named-lines/Test?label=build)](https://github.com/SavvyWombat/tailwindcss-grid-named-lines/actions)
[![Code Coverage](https://codecov.io/gh/SavvyWombat/tailwindcss-grid-named-lines/branch/main/graph/badge.svg)](https://codecov.io/gh/SavvyWombat/tailwindcss-grid-named-lines)

A plugin to provide TailwindCSS utilities for named grid lines.

The latest release of this plugin (version 1.3 onwards) will work with TailwindCSS versions 1 and 2.

## Installation

```
# npm
npm install --save-dev @savvywombat/tailwindcss-grid-named-lines

# yarn
yarn add --dev @savvywombat/tailwindcss-grid-named-lines
```

## Usage

Require the plugin into your `tailwindcss.config.js` file:

```javascript
// tailwindcss.config.js
module.exports = {
  plugins: [
    require('@savvywombat/tailwindcss-grid-named-lines')
  ]
}
```

Now, when adding `gridTemplateColumns` and `gridTemplateRows`, you can name the lines and utilities will be generated:

```javascript
// tailwindcss.config.js
module.exports = {
  theme: {
    gridTemplateColumns: {
      'default-layout': '[left] 1fr [gutter-left] 2rem [content-left] calc(768px - 4rem) [content-right] 2rem [gutter-right] 1fr [right]',
    },
    gridTemplateRows: {
      'default-layout': 
        '[top header-top] ' +
        '4rem ' +
        '[header-bottom content-top] ' +
        'minmax(1fr, max-content) ' +
        '[content-bottom footer-top] ' +
        'auto ' +
        '[bottom]',
    }
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-named-lines')
  ]
}
```

This will generate the following utilities (in addition to the default):

```
col-start-left
col-start-gutter-left
col-start-content-left
col-start-content-right
col-start-gutter-right
col-start-right

col-end-left
col-end-gutter-left
col-end-content-left
col-end-content-right
col-end-gutter-right
col-end-right

row-start-top
row-start-header-top
row-start-header-bottom
row-start-content-top
row-start-content-bottom
row-start-footer-top
row-start-footer-bottom
row-start-bottom

row-end-top
row-end-header-top
row-end-header-bottom
row-end-content-top
row-end-content-bottom
row-end-footer-top
row-end-footer-bottom
row-end-bottom
```

## Responsiveness

These labels do not have any responsive behaviour by themselves. Responsive grid layouts can be defined using `gridTemplateColumns` and `gridTemplateRows`:

```javascript
// tailwindcss.config.js
module.exports = {
  theme: {
    gridTemplateColumns: {
      'default-layout': '[left] 1fr [gutter-left] 2rem [content-left] calc(768px - 4rem) [content-right] 2rem [gutter-right] 1fr [right]',
      'small-layout': '[left gutter-left] 1rem [content-left] 1fr [content-right] 1rem [gutter-right right]',
    },
    gridTemplateRows: {
      'default-layout': 
        '[top header-top] ' +
        '4rem ' +
        '[header-bottom content-top] ' +
        'minmax(1fr, max-content) ' +
        '[content-bottom footer-top] ' +
        'auto ' +
        '[bottom]',
    }
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-named-lines')
  ]
}
```
## Repeated line names

This plugin will generate numbered utilities when multiple lines share the same name in a `gridTemplateColumns` or `gridTemplateRows` definition:

```javascript
// tailwindcss.config.js
module.exports = {
  theme: {
    gridTemplateColumns: {
      'default-layout': '[column-start] 1fr [column-start] 1fr [column-start] 1fr [column-start] 1fr',
    }
  }
}
```

This will generate the following utilities:

```
col-start-column-start-1
col-start-column-start-2
col-start-column-start-3
col-start-column-start-4

col-end-column-start-1
col-end-column-start-2
col-end-column-start-3
col-end-column-start-4
```

Additionally, the plugin will create properly indexed utilities for line names defined inside `repeat()`:

```javascript
// tailwindcss.config.js
module.exports = {
  theme: {
    gridTemplateColumns: {
      'default-layout': 'repeat(3, [left] 1fr [right])',
    }
  }
}
```

This will generate:

```
col-start-left-1
col-start-left-2
col-start-left-3

col-start-right-1
col-start-right-2
col-start-right-3

col-end-left-1
col-end-left-2
col-end-left-3

col-end-right-1
col-end-right-2
col-end-right-3
```

## Changelog

[Changelog](https://github.com/SavvyWombat/tailwindcss-grid-named-lines/blob/main/CHANGELOG.md)

## Related packages

### [TailwindCSS Grid Areas](https://github.com/SavvyWombat/tailwindcss-grid-areas)

A plugin to provide TailwindCSS utilities for grid areas.

## Licence

[MIT](https://github.com/SavvyWombat/tailwindcss-grid-named-lines/blob/main/LICENSE)
