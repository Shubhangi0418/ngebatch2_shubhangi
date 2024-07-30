import * as client from 'prom-client'

export const initiateMetrics = () => {

  // Create a Registry which registers the metrics
  const register = new client.Registry()

  // Add a default label which is added to all metrics
  register.setDefaultLabels({
    app: 'names-app'
  })

  // Enable the collection of default metrics
  client.collectDefaultMetrics({ register })

  const getRequests = new client.Counter({
    name: 'get_requests_total',
    help: 'Total number of get requests',
    labelNames: ['names_app']
  })

  const postRequests = new client.Counter({
    name: 'post_requests_total',
    help: 'Total number of post requests',
    labelNames: ['names_app']
  })

  register.registerMetric(getRequests)
  register.registerMetric(postRequests)

  return {
    register,
    getRequests,
    postRequests
  }
}
