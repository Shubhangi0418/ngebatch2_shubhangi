import express from 'express'
const app = express()
import { initiateMetrics } from './metrics'
import logger from './logger'

const { register, getRequests, postRequests } = initiateMetrics()

app.use(express.json())

const names = [
  'Rowan',
  'Bob',
  'Greg',
  'Steve',
  'Krom',
  'Miraculous Mark',
  'Secret Peter'
]

app.get('/metrics', async (req, res) => {

  res.setHeader('Content-Type', register.contentType)
  res.send(await register.metrics())
})

app.get('/names', (req, res) => {
  logger.info('Hit /Names end point')
  getRequests.inc()
  logger.info('names be', names)

  res.json(names)
})

// example post body would be {  }
app.post('/names', (req, res) => {
  const body = req.body
  names.push(body.name)

  postRequests.inc()
  res.json(names)
})

app.listen(9091, () => console.log('Server listening on port 9091!'))

export default app
