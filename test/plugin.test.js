import _ from "lodash";
import escapeClassName from "tailwindcss/lib/util/escapeClassName";
import plugin from "../src/plugin";

test("multiple templates with different names", () => {
  const addedUtilities = [];

  const config = {
    theme: {
      gridTemplateRows: {
        layout: "1fr [top] 1fr [bottom] 1fr",
        multi: "1fr [fold] 1fr [fold] 1fr",
      },
      gridTemplateColumns: {
        layout: "1fr [left] 1fr [right] 1fr",
      },
    },
    variants: {},
  };

  const getConfigValue = (path, defaultValue) =>
    _.get(config, path, defaultValue);
  const pluginApi = {
    config: getConfigValue,
    e: escapeClassName,
    theme: (path, defaultValue) =>
      getConfigValue(`theme.${path}`, defaultValue),
    variants: (path, defaultValue) => {
      if (_.isArray(config.variants)) {
        return config.variants;
      }

      return getConfigValue(`variants.${path}`, defaultValue);
    },
    addUtilities(utilities, variants) {
      addedUtilities.push({
        utilities,
        variants,
      });
    },
  };

  plugin(pluginApi);

  expect(addedUtilities).toEqual([
    {
      utilities: {
        ".row-start-top": {
          "grid-row-start": "top",
        },
        ".row-start-bottom": {
          "grid-row-start": "bottom",
        },
        ".row-start-fold-1": {
          "grid-row-start": "fold 1",
        },
        ".row-start-fold-2": {
          "grid-row-start": "fold 2",
        },
        ".row-end-top": {
          "grid-row-end": "top",
        },
        ".row-end-bottom": {
          "grid-row-end": "bottom",
        },
        ".row-end-fold-1": {
          "grid-row-end": "fold 1",
        },
        ".row-end-fold-2": {
          "grid-row-end": "fold 2",
        },
        ".col-start-left": {
          "grid-column-start": "left",
        },
        ".col-start-right": {
          "grid-column-start": "right",
        },
        ".col-end-left": {
          "grid-column-end": "left",
        },
        ".col-end-right": {
          "grid-column-end": "right",
        },
      },
      variants: [],
    },
  ]);
});
