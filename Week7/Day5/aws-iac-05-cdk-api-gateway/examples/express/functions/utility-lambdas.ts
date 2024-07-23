import { Request, Response } from 'express'
import {
  timestampText,
} from './common'

// API methods
export const healthcheckGetHandler = async (req: Request, res: Response) => {
  console.log('healthcheckGetHandler called: event:', req)
  const responseData = {
    timestamp: timestampText(),
    success: 'Hello'
  }
  return res.status(200).json(responseData)
}
