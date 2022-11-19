import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../middleware/mongodb'
import moment from 'moment'
import { User } from '../../models/user';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Capture request method, we type it as a key of ResponseFunc to reduce typing later
    if (req.method === 'POST') {
        const { name, email, password } = req.body;
        const user = await User.find({
            email
        })
        console.log(user)
        if(user && user.length > 0){
            return res.status(500).json({status:'Failed'});
        }
        await connectDB() // conect to database
        const userData = await User.create({
            name, email, password
        })

        return res.status(200).json({ status: 'success' })
    }
}

export default handler