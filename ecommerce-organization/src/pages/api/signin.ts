import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../middleware/mongodb'
import moment from 'moment'
import { User } from '../../models/user';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Capture request method, we type it as a key of ResponseFunc to reduce typing later
    if (req.method === 'POST') {
        const { email, password } = req.body;
        await connectDB() // conect to database
        const data = await User.find({
            email
        })
        

        if(!data || data.length ===0 ){
            return res.status(500).json({status:'Failed'})
        }
        const user = data[0];
        if(user.password === password){
            return res.status(200).json({ user })
        }
        return res.status(500).json({status:'Failed'})
        
    }
}

export default handler