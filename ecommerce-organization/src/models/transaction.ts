
// module.exports = new mongoose.Schema({
//   senderAccountNo: "string",
//   receiverAccountNo: "string",
//   transactionAmount: "string",
//   transactionId: "string",
//   transactionAt: "date",
// });


import { Schema, model, models } from 'mongoose'

// Document Interface
export interface ITransaction {
  
    senderAccountNo: string,
    receiverAccountNo: string,
    transactionAmount: string,
    transactionId: string,
    transactionAt: Date
}

const schema = new Schema<ITransaction> ({
    senderAccountNo: { type: String, required: true },
    receiverAccountNo: { type: String, required: true },
    transactionAmount: {type: String, required: true},
    transactionId: {type: String},
    transactionAt: {type: Date}
    
  })
  
  export const Transaction = models.Transaction || model<ITransaction>('Transaction', schema)
