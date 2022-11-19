import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../../middleware/mongodb'
import moment from 'moment'
import { User } from '../../../models/user';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Capture request method, we type it as a key of ResponseFunc to reduce typing later
    if (req.method === 'GET') {
        const email = req.query.email;
        await connectDB() // conect to database
        const data = await User.find({
            email
        })
        
        console.log({data})
        if(!data || data.length ===0 ){
            return res.status(500).json({status:'Failed'})
        }
        const user = data[0];
        
        return res.status(200).json({ user })
        
    }
}

export default handler