exports.handler = async function(event, context) {
  doSomethingElse(event, context)
  return { 'result': 'ok' }
}

function doSomethingElse(event, context) {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  console.log(`CONTEXT: ${JSON.stringify(context)}`)
  const gigId = event.gigId || 'NOT_SET'
  const gigLocation = event.gigLocation || 'NOT_SET'
  console.log(`PARAMS: gigId = ${gigId}`)
  console.log(`PARAMS: gigLocation = ${gigLocation}`)
  console.log('more code here')
}
