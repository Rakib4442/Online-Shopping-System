import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'
import cookie from 'js-cookie'

export default function Links() {
  const email = cookie.get('email')
  console.log({email})
  const [balance, setBalance] = useState(0);
  // const [show, setShow] = useState(false)

  const showBalance = async ()=>{
      const res = await axios.get(`/api/bankinfo/${email}`);
      console.log({res})
      if(res && res?.data && res?.data?.user){
        setBalance(res.data.user?.balance || 0);
      }

  }

  // const toggleShow=()=>{
  //   setShow((prev)=>!prev)
  // }


  return (
    <Menu>
    <li>
      <Link href='/'>
        <a className='link'>home</a>
      </Link>
    </li>

    <li>
      <Link href='/products'>
        <a className='link'>products</a>
      </Link>
    </li>

    {/* <li>
      <Link href='/products/create'>
        <a className='link'>create</a>
      </Link>
    </li> */}

    <li>
      <Link href='/orders'>
        <a className='link'>orders</a>
      </Link>
    </li>

    <li>
      <Link href='/signup'>
        <a className='link'>SignUp</a>
      </Link>
    </li>

    <li>
      <Link href='/signin'>
        <a className='link'>SignIn</a>
      </Link>
    </li>

    <li>
      <Link href='/logout'>
        <a className='link'>logout</a>
      </Link>
    </li>

    

    <li>
      <Link href='/about'>
        <a className='link'>about</a>
      </Link>
    </li>
   <li>
      <button onClick={async()=> await showBalance()}>
        <h4 className='link'>{`Show Balance ${balance === 0 ? '':`${balance}`}`}</h4>
      </button>
    </li>

    {/* {show &&  <li>
      <button onClick={()=>toggleShow()}>
        <h4 className='link'>Hide Balance</h4>
      </button>
    </li>} */}
    

  </Menu>
  )
}

const Menu = styled.ul`
  align-self: flex-end;
  grid-column: 1/6;
  flex-wrap: wrap;
  display: flex;

  .link {
    color: inherit;
    display: block;
    font-weight: 600;
    padding: .3rem;
    text-decoration: none;
    text-transform: capitalize;

    @media screen and ( max-width: 900px ) {
      font-size: .69rem;
    }
  
    &:hover {
      opacity: .8;
    }
  }
`