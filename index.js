const _ = require('lodash')
const extractGridLineNames = require('./src/util/extractGridLineNames')

module.exports = function () {
  return function ({ addUtilities, target, theme }) {
    if (
      target('gridRowStart') === 'ie11' ||
      target('gridRowEnd') === 'ie11' ||
      target('gridColumnStart') === 'ie11' ||
      target('gridColumnEnd') === 'ie11'
    ) {
      return
    }

    const namedGridRows = extractGridLineNames(theme('gridTemplateRows'))
    const namedGridColumns = extractGridLineNames(theme('gridTemplateColumns'))

    const utilities = [
      {
        prefix: 'row-start',
        class: 'grid-row-start',
        lines: namedGridRows,
      },
      {
        prefix: 'row-end',
        class: 'grid-row-end',
        lines: namedGridRows,
      },
      {
        prefix: 'col-start',
        class: 'grid-col-start',
        lines: namedGridColumns,
      },
      {
        prefix: 'col-start',
        class: 'grid-col-start',
        lines: namedGridColumns,
      },
    ]

    const namedLines = utilities.reduce((lines, utility) => {
      return {
        ...lines,
        ..._.fromPairs(
          _.map(utility.lines, (name) => [
            `.${utility.prefix}-${name}`,
            {
              [utility.class]: name,
            },
          ])
        ),
      }
    }, {})

    addUtilities({ ...namedLines }, [])
  }
}
