import extractGridLineNames from '../../src/util/extractGridLineNames'

test('passing nothing gives you an empty list', () => {
  expect(extractGridLineNames()).toEqual([])
})

test('no names in the gridTemplate definition gives an empty list', () => {
  const gridTemplateRows = {
    layout: '1fr 1fr 1fr',
  }

  expect(extractGridLineNames(gridTemplateRows)).toEqual([])
})

test('lists the named grid lines', () => {
  const gridTemplateRows = {
    layout: '1fr [left] 1fr [right] 1fr',
  }

  expect(extractGridLineNames(gridTemplateRows)).toEqual(['left', 'right'])
})

test('grid lines with the same name are indexed', () => {
  const gridTemplateRows = {
    layout: '1fr [column] 1fr [column] 1fr',
  }

  expect(extractGridLineNames(gridTemplateRows)).toEqual(['column 1', 'column 2'])
})

test('multiple names on the same grid line are valid', () => {
  const gridTemplateRows = {
    layout: '1fr [left middle] 1fr [right] 1fr',
  }

  expect(extractGridLineNames(gridTemplateRows)).toEqual(['left', 'middle', 'right'])
})

test('spaces between multiple names are not important', () => {
  const gridTemplateRows = {
    layout: '1fr [left     middle] 1fr [right] 1fr',
  }

  expect(extractGridLineNames(gridTemplateRows)).toEqual(['left', 'middle', 'right'])
})

test('multiple gridTemplates can use the same grid line names', () => {
  const gridTemplateRows = {
    layout: '1fr [left] 1fr [right] 1fr',
    other: '[left] 1fr [right] 1fr',
    multi: '1fr [column] 1fr [column] 1fr',
    four: '[column] 1fr [column] 1fr [column]',
  }

  expect(extractGridLineNames(gridTemplateRows)).toEqual([
    'left',
    'right',
    'column 1',
    'column 2',
    'column 3',
  ])
})

test('supports repeat', () => {
  const gridTemplateRows = {
    layout: 'repeat(2, [line] 1fr)',
  }

  expect(extractGridLineNames(gridTemplateRows)).toEqual(['line 1', 'line 2'])
})

test('ignores repeat with no lines', () => {
  const gridTemplateRows = {
    layout: '[outstart] repeat(2, 1fr) [outend]',
  }

  expect(extractGridLineNames(gridTemplateRows)).toEqual(['outstart', 'outend'])
})

test('includes start and end from repeat', () => {
  const gridTemplateRows = {
    layout: 'repeat(2, [instart] 1fr [inend])',
  }

  expect(extractGridLineNames(gridTemplateRows)).toEqual(
    expect.arrayContaining(['instart 1', 'instart 2', 'inend 1', 'inend 2'])
  )
})

test('supports multiple repeats', () => {
  const gridTemplateRows = {
    layout: 'repeat(2, [line] 1fr) repeat(2, [more] 2fr)',
  }

  expect(extractGridLineNames(gridTemplateRows)).toEqual(
    expect.arrayContaining(['line 1', 'line 2', 'more 1', 'more 2'])
  )
})
