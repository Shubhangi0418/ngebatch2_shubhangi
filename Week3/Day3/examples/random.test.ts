import { randomUnder100 } from './random'

test('should use Math', () => {
  // Arrange
  const spyRandom = jest.spyOn(global.Math, 'random')
  spyRandom.mockReturnValue(0.031)

  // Act + Assert
  expect(randomUnder100()).toEqual(3)

  expect(spyRandom).toHaveBeenCalled() // i.e. > 0
  // or
  expect(spyRandom.mock.calls.length).toBe(1)
  // or
  expect(spyRandom).toHaveBeenCalledTimes(1)
})
