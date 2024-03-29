const _ = require("lodash");
const extractGridLineNames = require("./util/extractGridLineNames");

module.exports = function ({ addUtilities, theme }) {
  const namedGridRows = extractGridLineNames(theme("gridTemplateRows"));
  const namedGridColumns = extractGridLineNames(theme("gridTemplateColumns"));

  const prefixes = [
    {
      utility: "row-start",
      class: "grid-row-start",
      lines: namedGridRows,
    },
    {
      utility: "row-end",
      class: "grid-row-end",
      lines: namedGridRows,
    },
    {
      utility: "col-start",
      class: "grid-column-start",
      lines: namedGridColumns,
    },
    {
      utility: "col-end",
      class: "grid-column-end",
      lines: namedGridColumns,
    },
  ];

  const namedLines = prefixes.reduce((lines, prefix) => {
    return {
      ...lines,
      ..._.fromPairs(
        _.map(prefix.lines, (name) => [
          `.${prefix.utility}-${name.replace(" ", "-")}`,
          {
            [prefix.class]: name,
          },
        ])
      ),
    };
  }, {});

  addUtilities({ ...namedLines }, []);
};
