import type { NextApiRequest, NextApiResponse } from 'next'

const BUNDLE_ID = 'DZPLAPPP9Y.app.sawaeed'

const association = {
  applinks: {
    apps: [],
    details: [
      {
        appID: `${BUNDLE_ID}`,
        paths: ['/app/*', '/auth/*'],
      },
    ],
  },
}

export default (_: NextApiRequest, response: NextApiResponse) => {
  return response.status(200).send(association)
}