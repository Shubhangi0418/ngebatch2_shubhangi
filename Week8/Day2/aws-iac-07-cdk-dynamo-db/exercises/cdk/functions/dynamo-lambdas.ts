import {
  bootstrapGigData,
  getGigDataList,
  getGigDataById,
  postGigData,
} from './dynamo'

import {
  timestampText,
  responseToApiGw,
  responseToApiGwWithError,
  LambdaResult,
  LambdaEvent,
} from './common'

export const bootstrapGigDataHandler = async () => {
  // the response of this lambda does not technically need to match
  // the structure api gw expects as we invoke it directly after a cdk-deploy
  console.log('bootstrap-gig-data: called')

  try {
    const numberItems = await bootstrapGigData()

    return responseToApiGw(200,
      {
        success: 'bootstrap-gig-data done',
        time: timestampText(),
        numberItems
      })
  } catch (error) {
    console.log('bootstrap-gig-data: error:', error)
    return responseToApiGw(500,
      {
        time: timestampText(),
        failure: 'bootstrap-gig-data: error',
        error
      })
  }
}

export const getGigDataHandler = async (): LambdaResult => {
  console.log('GET /api/gig-data: called')
  try {
    const data = await getGigDataList()
    /*
    data = {
      "Count": 8,
      "ScannedCount": 8,
      Items: [ {},  {} , {}, ...]
    }
    i.e. Items is an array of objects, one per row
    */
    return responseToApiGw(200, data)
  } catch (error) {
    console.log('GET /api/gig-data: error:', error)
    return responseToApiGwWithError(500, 'Error getting gig-data, check server logs')
  }
}

export const getGigDataByIdHandler = async (event: LambdaEvent): LambdaResult => {
  console.log(`GET /api/gig-data-by-id: called with: ${JSON.stringify(event)}`)

  try {
    const urlParams = event.pathParameters || {}
    console.log('GET /api/gig-data-by-id: urlParams:', urlParams)

    const data = await getGigDataById(urlParams.gig_id || '-1')
    console.log('GET /api/gig-data-by-id: result:', data)
    return responseToApiGw(200, data)
  } catch (error) {
    console.log('GET /api/gig-data-by-id: error:', error)
    return responseToApiGwWithError(500, 'Error getting gig-data-by-id, check server logs')
  }
}

export const gigDataPostHandler = async (event: LambdaEvent): LambdaResult => {
  console.log(`POST /api/gig-data: called with: ${JSON.stringify(event)}`)

  try {
    const postDataText = event.body || '{}'
    const postDataJson = JSON.parse(postDataText)
    console.log('POST /api/gig-data: postDataJson:', postDataJson)
    /* should look like this:
      {
        "gig_id": 1,
        "location": "The Wardrobe",
        "data": {
            "menu": { "burger": 9.99, "falafel": 7.99 }
        }
      }
    */

    const result = await postGigData(postDataJson)
    console.log('POST /api/gig-data: result:', result)
    return responseToApiGw(200, result)
  } catch (error) {
    console.log('POST /api/gig-data: error:', error)
    return responseToApiGwWithError(500, 'Error posting gig-data, check server logs')
  }
}
