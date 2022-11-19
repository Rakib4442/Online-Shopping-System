import { NextApiRequest, NextApiResponse } from 'next'
import { getCookie, setCookies } from 'cookies-next'
import connectDB from '../../../middleware/mongodb'
import { validate } from '../../../middleware/validate'
import { Order } from '../../../models/order'
import { Product } from '../../../models/product'
import { IProduct } from '../../../types/types'
import { deliverySchema } from '../../../models/yup/delivery'
import { updateCart } from '../../../helpers/validateCart'
import { Transaction } from '../../../models/transaction'
import { User } from '../../../models/user'


const ecommerce_account_no = 1234567;
const supplier_account_no = 123456;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cart = req.body.items
    const user_ac = req.body.Account_Number
    console.log({user_ac})
    const id = cart.map((item: { _id: string, quantity: number }) => item._id)

    await connectDB()
    const items: IProduct[] = await Product.find({ _id: { $in: id } })
    const total = items.map((item) => item?.price || 0).reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    )
    console.log({ total })
    const cartDB = updateCart(items, cart)
    const ts = Date.now();
    const u_e = await Transaction.create({
      senderAccountNo: user_ac,
      receiverAccountNo: ecommerce_account_no,
      transactionAmount: total * 0.1,
      transactionId: ts,
      transactionAt: new Date().toISOString()
    })

    const e_s = await Transaction.create({
      senderAccountNo: ecommerce_account_no,
      receiverAccountNo: supplier_account_no,
      transactionAmount: total * 0.9,
      transactionId: Date.now(),
      transactionAt: new Date().toISOString()
    })


    const userData = await User.updateOne({ Account_Number: user_ac }, {
      $inc: {
        balance: -total
      }
    }, { upsert: true })

    const userData1 = await User.updateOne({ Account_Number: ecommerce_account_no }, {
      $inc: {
        balance: (total * 0.1)
      }
    }, { upsert: true })


    const userData2 = await User.updateOne({ Account_Number: supplier_account_no }, {
      $inc: {
        balance: (total * 0.9)
      }
    }, { upsert: true })

    const order = await Order.create({
      customer: req.body.customer,
      items: cartDB,
      total: total,
      ts: ts,
      status: 'Pending'
    })

    const exits = getCookie('order-token', { req, res })

    if (!exits) {
      setCookies('order-token', order._id, {
        req, res,
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development'
      })
    }

    return res.status(200).json({ status: 'success' })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ err: 'No Response' })
  }
}

export default handler;