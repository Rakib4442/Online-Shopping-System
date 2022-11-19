import { Schema, model, models } from 'mongoose'
import { IOrder } from '../types/order'

const OrderSquema = new Schema<IOrder>({
  customer: {
    name: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String, required: true},
  },
  items: [
    {
      _id: {type: String, required: true},
      name: { type: String },
      quantity: { type: Number }
    }
  ],
  total:{type:String, required:true},
  ts:{type:String},
  status: {type: String, required: true},
}, { timestamps: true })

export const Order = models.Order || model<IOrder>('Order', OrderSquema)