import * as fs from 'fs'

export const getUsers = () => {
  const userData = fs.readFileSync('data/users.json')
  return JSON.parse(userData.toString())
}

export const writeUsers = (filename: string, userData: any) => {
  const userString = JSON.stringify(userData)
  return fs.writeFileSync(filename, userString)
}
