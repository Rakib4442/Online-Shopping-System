import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../middleware/mongodb'
import moment from 'moment'
import { User } from '../../models/user';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Capture request method, we type it as a key of ResponseFunc to reduce typing later
    if (req.method === 'POST') {
        await connectDB() // conect to database
        const { Bank_Name, Account_Number, email, Secret_Code } = req.body;
        const user = await User.find({
            email
        })
        console.log(user)
        if (user && user.length === 0) {
            return res.status(500).json({ status: 'Failed' });
        }

        const userData = await User.updateOne({ email }, {
            $set: {
                Bank_Name, Account_Number, email, Secret_Code, balance:100000
            }
        },{ upsert: true })
    const _user = await User.find({
        email
    })
    console.log({ _user })
    return res.status(200).json({ status: 'success' })
}
if(req.method === 'GET'){
    const {email} = req.query;
    const user = await User.find({
        email
    })
    console.log(user)
    if (user && user.length === 0) {
        return res.status(200).json({ status:'Failed', user: null });
    }
    return res.status(200).json({ status: 'Success', user:user[0] });
}
}

export default handler