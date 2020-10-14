const _ = require('lodash')
const extractGridLineNames = require('./util/extractGridLineNames')

module.exports = function () {
  return function ({addUtilities, target, theme}) {
    if (
      target('gridRowStart') === 'ie11' ||
      target('gridRowEnd') === 'ie11' ||
      target('gridColumnStart') === 'ie11' ||
      target('gridColumnEnd') === 'ie11'
    ) {
      return
    }

    const namedGridRows = extractGridLineNames(theme('gridTemplateRows'))

    const namedRowStarts = _.fromPairs(
      _.map(namedGridRows, (name) => [
        `.row-start-${name}`,
        {
          'grid-row-start': name,
        },
      ])
    )

    const nameRowEnds = _.fromPairs(
      _.map(namedGridRows, (name) => [
        `.row-end-${name}`,
        {
          'grid-row-end': name,
        },
      ])
    )

    const namedGridColumns = extractGridLineNames(theme('gridTemplateColumns'))

    const namedColumnStarts = _.fromPairs(
      _.map(namedGridColumns, (name) => [
        `.col-start-${name}`,
        {
          'grid-column-start': name,
        },
      ])
    )

    const nameColumnEnds = _.fromPairs(
      _.map(namedGridColumns, (name) => [
        `.col-end-${name}`,
        {
          'grid-column-end': name,
        },
      ])
    )

    addUtilities({...namedRowStarts}, [])
    addUtilities({...nameRowEnds}, [])
    addUtilities({...namedColumnStarts}, [])
    addUtilities({...nameColumnEnds}, [])
  }
}