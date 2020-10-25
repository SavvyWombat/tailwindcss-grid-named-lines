const _ = require('lodash')

module.exports = function (gridTemplate) {
  return _.uniq(
    _.flatMap(gridTemplate, (value) => {
      if (!value.match(/\[([^\]]*)\]/g)) {
        return []
      }

      const matches = [
        // extract grid line names from the gridTemplate (including names used in repeat(n, def)
        ..._.flatMap(value.match(/\[([^\]]*)\]/g), (match) => {
          return match.substring(1, match.length - 1).split(/\s+/)
        }),
        // extract repeat(n, def)
        ..._.flatMap(value.match(/repeat\([^\)]*\)/g), (repeat) => {
          const found = repeat.match(/\((?<count>[0-9]+),\s*(\[(?<first>[^\]]+)\])?[^\[]+(\[(?<second>[^\]]+)\])?/)

          if (typeof found.groups.count === 'undefined') {
            return []
          }

          let result = [];
          // start at 1 here reduce the number of repeated names by one
          // because the first match above will include the names from repeat(n, def)
          for (let i = 1; i < found.groups.count; i++) {
            if (typeof found.groups.first !== 'undefined') {
              result.push(found.groups.first)
            }
            if (typeof found.groups.second !== 'undefined') {
              result.push(found.groups.second)
            }
          }

          return result
        })
      ]
      // create a unique list of names, including counts of how many times that name is used
      const counts = _.fromPairs(matches
          .filter((v, i, a) => a.indexOf(v) === i)
          .map((match) => {
            return [
              match,
              {
                count: 1,
                total: matches.reduce((count, m) => {
                  return match === m ? ++count : count
                }, 0),
              },
            ]
          })
      )

      // create a list of grid line names for this template, indexing repeated names
      return matches.map((match) => {
        if (counts[match].total === 1) {
          return match
        }

        return `${match} ${counts[match].count++}`
      })
    })
  )
}
