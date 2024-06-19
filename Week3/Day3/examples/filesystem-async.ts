import { promises as fs } from 'fs'

export const getUsers = async () => {
  const userData = await fs.readFile('data/users.json')
  return JSON.parse(userData.toString())
}

export const writeUsers = async (filename: string, userData: any) => {
  const userString = JSON.stringify(userData)
  return await fs.writeFile(filename, userString)
}
