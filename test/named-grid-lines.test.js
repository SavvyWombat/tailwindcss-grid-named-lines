import _ from 'lodash'
import escapeClassName from 'tailwindcss/lib/util/escapeClassName'
import gridRowEnd from 'tailwindcss/lib/plugins/gridRowEnd'
import gridRowStart from 'tailwindcss/lib/plugins/gridRowStart'
import plugin from '../src/named-grid-lines'

test('multiple templates with different names', () => {
  const addedUtilities = []

  const config = {
    target: 'relaxed',
    theme: {
      gridTemplateRows: {
        layout: '1fr [top] 1fr [bottom] 1fr',
        multi: '1fr [fold] 1fr [fold] 1fr',
      },
      gridRowStart: {
        auto: 'auto',
        '1': '1',
      },
      gridRowEnd: {
        auto: 'auto',
        '1': '1',
        '2': '2',
      },
    },
    variants: {
      gridRowStart: ['responsive'],
      gridRowEnd: ['hover'],
    },
  }

  const getConfigValue = (path, defaultValue) => _.get(config, path, defaultValue)
  const pluginApi = {
    config: getConfigValue,
    e: escapeClassName,
    target: () => {
      return 'relaxed'
    },
    theme: (path, defaultValue) => getConfigValue(`theme.${path}`, defaultValue),
    variants: (path, defaultValue) => {
      if (_.isArray(config.variants)) {
        return config.variants
      }

      return getConfigValue(`variants.${path}`, defaultValue)
    },
    addUtilities(utilities, variants) {
      addedUtilities.push({
        utilities,
        variants,
      })
    },
  }

  gridRowStart()(pluginApi)
  gridRowEnd()(pluginApi)
  plugin()(pluginApi)

  expect(addedUtilities).toEqual([
    {
      utilities: [
        {
          '.row-start-1': {
            gridRowStart: '1',
          },
          '.row-start-auto': {
            gridRowStart: 'auto',
          },
        },
      ],
      variants: ['responsive'],
    },
    {
      utilities: [
        {
          '.row-end-2': {
            gridRowEnd: '2',
          },
          '.row-end-1': {
            gridRowEnd: '1',
          },
          '.row-end-auto': {
            gridRowEnd: 'auto',
          },
        },
      ],
      variants: ['hover'],
    },
    {
      utilities: {
        '.row-start-top': {
          'grid-row-start': 'top',
        },
        '.row-start-bottom': {
          'grid-row-start': 'bottom',
        },
        '.row-start-fold-1': {
          'grid-row-start': 'fold-1',
        },
        '.row-start-fold-2': {
          'grid-row-start': 'fold-2',
        },
      },
      variants: ['responsive'],
    },
    {
      utilities: {
        '.row-end-top': {
          'grid-row-end': 'top',
        },
        '.row-end-bottom': {
          'grid-row-end': 'bottom',
        },
        '.row-end-fold-1': {
          'grid-row-end': 'fold-1',
        },
        '.row-end-fold-2': {
          'grid-row-end': 'fold-2',
        },
      },
      variants: ['hover'],
    },
  ])
})
