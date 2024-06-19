import * as fs from 'fs'
import { getUsers, writeUsers } from './filesystem'

jest.mock('fs')

const mockReadFileSync = fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>
const mockWriteFileSync = fs.writeFileSync as jest.MockedFunction<typeof fs.writeFileSync>

beforeEach(() => {
  // Without one of these, or the global setting, repeat calls to fs.xyz methods 
  // will all increment the call count across tests
  mockReadFileSync.mockReset()
  mockWriteFileSync.mockReset()
  // or
  jest.resetAllMocks()
})

test('should fetch users', () => {
  // Arrange
  mockReadFileSync.mockReturnValue('["dummy payload"]')
  
  // Act + Assert
  expect(getUsers()).toEqual(['dummy payload'])

  expect(mockReadFileSync.mock.calls.length).toBe(1)
  // or
  expect(mockReadFileSync).toHaveBeenCalled() // i.e. > 0
  // or
  expect(mockReadFileSync).toHaveBeenCalledTimes(1)
})

test('should write users', () => {
  // Arrange
  const userData = { 'name': 'Mike', 'age': '22' }
  const dummyDataString = JSON.stringify(userData)
  const fileName = '/home/mike/userData.json'

  // Act 
  writeUsers(fileName, userData)

  // Assert
  expect(mockWriteFileSync.mock.calls.length).toBe(1)
  expect(mockWriteFileSync.mock.calls[0][0]).toBe(fileName)
  expect(mockWriteFileSync.mock.calls[0][1]).toBe(dummyDataString)
  // or
  expect(mockWriteFileSync).toHaveBeenCalledTimes(1)
  expect(mockWriteFileSync).toHaveBeenLastCalledWith(fileName, dummyDataString)
})
