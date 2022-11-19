import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'
import { IOrder } from '../../types/order'
import cookie from 'js-cookie'
interface Data {
  data: IOrder
}
export default function Order({ data }: Data) {
  const [disabledOne, setDisabledOne] = useState<boolean>(false)
  const [deleteOne, setDeleteOne] = useState<string>('Delete Order')
  const email = cookie.get('email');

  async function handleDeleteOne(arg: string) {
    try {
      setDeleteOne('Wait Or Refresh')
      setDisabledOne(true)
      const res = await axios.delete(`/api/orders/${data._id}`)

      const message = res.data
      if (message.status === 'DENIED') {
        alert('Must be at least 3 elements to remove others.')
        setDeleteOne('Delete Order')
      }
    } catch (err) {
      setDeleteOne('No response from server')
    }
  }

  const changeStatus = async (id, status) => {
    const res = await axios.post(`/api/orders/change`, { id, status })
    console.log({ res })

  }

  return (
    <Box>
      <Customer color={(data.status === 'Pending') ? '#ac3636' : '#2e7029'}>
        {/* <Customer color={ (data.status === 'Pending') ? '#ac3636':'#2e7029' }> */}

        <h2>Status: {data.status}</h2>
        <h1>Order History :</h1>

        <Container>
          <span><b>FullName:</b></span>
          <span>{data.customer?.name}</span>
        </Container>
        <Container>
          <span><b>Gmail:</b></span>
          <span>{data.customer.email}</span>
        </Container>
        <Container>
          <span><b>MobileNumber:</b></span>
          <span>{data.customer.phoneNumber}</span>
        </Container>

        <Container>
          <span><b>Date:</b></span>
          <span>{data.createdAt.split('T')[0]}</span>
        </Container>
        {email?.includes('supplier') && <button onClick={() => changeStatus(data._id, data.status === 'Pending' ? 'Delivered' : 'Pending')}>{data.status === 'Pending' ? 'Mark as delivered' : 'Mark as pending'}</button>}
      </Customer>
      <Items>
        <h1>Total Order :</h1>
        <div>
          {data.items.map(i => (
            <div key={i._id} className='box'>
              <span>{i.name} <b>x</b> {i.quantity ? i.quantity : 1}</span>
              <span>,</span>
            </div>
          ))}
        </div>
      </Items>
      <button onClick={() => handleDeleteOne(data._id)} disabled={disabledOne}>{deleteOne}</button>
    </Box>
  )
}

const Box = styled.div`
  background-color: #2d2826c1;
  border-radius: .3rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-around;
  gap: 2rem;
  padding: 2rem;

  width: 100%;
  height: auto;

  button {
    justify-self: center;
    grid-column: 1/3;
    background-color: #5c2222;
    border-radius: .3rem;
    color: #eee;
    font-weight: 600;
    padding: .6rem 1rem;

    width: 200px;
    height: auto;

    @media screen and ( max-width: 900px ) {
      font-size: .8rem;
    }

    &:hover {
      background-color: #9b2525;
    }

    &:disabled {
      &:hover {
        background-color: #5c2222;
      }
    }
  }
`

const Customer = styled.div<{ color: string }>`
  grid-column: auto;
  background-color: #000000cc;
  border-radius: .6rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  gap: 1rem;

  width: auto;
  height: auto;
  
  @media screen and ( max-width: 650px ) {
      grid-column: 1/3;
  }

  h1 {
    margin-bottom: .6rem;
    @media screen and ( max-width: 900px ) {
      font-size: 1.3rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: 1rem;
    }
  }

  h2 {
    align-self: flex-end;
    background-color: ${props => props.color};
    border-radius: .3rem;
    color: #fff;
    font-size: 1.2rem;
    padding: .6rem;
    width: fit-content;

    @media screen and ( max-width: 900px ) {
      font-size: .9rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: .66rem;
    }
  }
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;

  span {
    color: #aaa;
    font-weight: 500;
    text-transform: capitalize;

    @media screen and ( max-width: 900px ) {
      font-size: .8rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: .66rem;
    }
    
    b {
      color: #ddd;
    }
  }
`

const Items = styled.div`
  grid-column: auto;
  background-color: #000000cc;
  border-radius: .6rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: auto;
  height: auto;

  @media screen and ( max-width: 650px ) {
      grid-column: 1/3;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    gap: .6rem;
  }

  h1 {
    margin-bottom: .6rem;
    @media screen and ( max-width: 900px ) {
      font-size: 1.3rem;
    }
    @media screen and ( max-width: 600px ) {
      font-size: 1rem;
    }
  }

  .box {
    @media screen and ( max-width: 900px ) {
      font-size: .8rem;
    }

    @media screen and ( max-width: 600px ) {
      font-size: .66rem;
    }

    span:first-child {
      font-weight: 600;
      text-transform: capitalize;

      b {
        padding: 0 .3rem;
      }
    }

    span:last-child {
      color: #eeff6d;
      font-weight: 700;
    }

    &:last-child {
      span:last-child {
        opacity: 0;
      }
    }
  }
`
