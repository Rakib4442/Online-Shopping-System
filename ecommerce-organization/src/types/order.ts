export interface IOrder {
  _id: string,
  customer: {
    name: string,
    email: string,
    phoneNumber: string,
    
    ///address: string,
    //city: string,
  }
  items: [{
    _id: string,
    name: string,
    quantity: number
  }]
  total: string,
  status: string,
  createdAt: string,
  ts:string,
}