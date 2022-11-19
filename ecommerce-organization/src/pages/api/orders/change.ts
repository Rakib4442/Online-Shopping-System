import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../../middleware/mongodb'
import { Order } from '../../../models/order'
import { IOrder } from '../../../types/order'
import { ResponseFuncs } from '../../../types/types'
import moment from 'moment'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const { id, status } = req.body;
        await connectDB();
        const data = await Order.updateOne({ _id: id }, { $set: { status } }, { upsert: true })
        return res.status(200).json({status:'OK'})
    }
}

export default handler