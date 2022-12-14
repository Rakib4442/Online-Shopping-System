import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

export function validate(
  squema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if( ['POST', 'PUT'].includes(req.method) ) {
      try {
        console.log(req.body)
        req.body = await squema.camelCase().validate(req.body, { abortEarly: false })
      }
      catch(error) {
        console.log(error)
        return res.status(400).json({ error })
      }
    }
    await handler(req, res)
  }
}