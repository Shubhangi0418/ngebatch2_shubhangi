exports.handler = async function(event, context) {
  doSomethingElse(event, context)
  return { 'result': 'ok' }
}

function doSomethingElse(event, context) {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  console.log(`CONTEXT: ${JSON.stringify(context)}`)
  console.log(`Best gig is ${process.env.FAVOURITE_GIG}`)
}
