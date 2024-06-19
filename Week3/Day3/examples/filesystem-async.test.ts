import { promises as fs} from 'fs'
import { getUsers, writeUsers } from './filesystem-async'

jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn().mockResolvedValue(undefined),
    readFile: jest.fn().mockResolvedValue(undefined),
  }
}))

// We need these two lines to tell the rest of our test file that
// we have mocked out the readFile and writeFile functions
const mockReadFile = fs.readFile as jest.MockedFunction<typeof fs.readFile>
const mockWriteFile = fs.writeFile as  jest.MockedFunction<typeof fs.writeFile>

beforeEach(() => {
  // Without one of these, or the global setting, repeat calls to fs.xyz methods 
  // will all increment the call count across tests
  mockReadFile.mockReset()
  mockWriteFile.mockReset()
  // or
  jest.resetAllMocks()
})

test('should fetch users', async () => {
  // Arrange
  mockReadFile.mockResolvedValue('["dummy payload"]')
  
  // Act + Assert
  await expect(getUsers()).resolves.toEqual(['dummy payload'])

  await expect(mockReadFile.mock.calls.length).toBe(1)
  // or
  await expect(mockReadFile).toHaveBeenCalled() // i.e. > 0
  // or
  await expect(mockReadFile).toHaveBeenCalledTimes(1)
})

test('should write users', async () => {
  // Arrange
  const userData = { 'name': 'Mike', 'age': '22' }
  const dummyDataString = JSON.stringify(userData)
  const fileName = '/home/mike/userData.json'

  // Act 
  await writeUsers(fileName, userData)

  // Assert
  await expect(mockWriteFile.mock.calls.length).toBe(1)
  await expect(mockWriteFile.mock.calls[0][0]).toBe(fileName)
  await expect(mockWriteFile.mock.calls[0][1]).toBe(dummyDataString)
  // or
  await expect(mockWriteFile).toHaveBeenCalledTimes(1)
  await expect(mockWriteFile).toHaveBeenLastCalledWith(fileName, dummyDataString)
})
