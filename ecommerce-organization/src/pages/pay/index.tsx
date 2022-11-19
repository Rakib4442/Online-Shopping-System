import axios from 'axios'
import { getCookie } from 'cookies-next'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ConfirmPay, Delivery } from '../../components'
import { useCartContext } from '../../context/cart'
import Custom404 from '../404'
import cookie from 'js-cookie'

interface Props {
  step: number
}

export default function payForm(props: Props) {
  const [step, setStep] = useState<number>(props.step)
  const [total, setTotal] = useState<string>('0')
  const { items } = useCartContext()
  const [userBankInfo, setUserBankInfo] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get new array with all totals
   const totals: number[] | false = items ? items.map(item => item.total) : false
   // return sum of all totals
   const result: number = totals ? totals.reduce((a, b) => a + b, 0) : 0
   // format result to local currency
   const currenty: string = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(result)
   // update total state
   setTotal(currenty)
  }, [items])

  useEffect(()=>{
    const getUserBankInfo = async() =>{
      setLoading(true)
     await axios.get(`/api/bankinfo/${cookie.get('email')}`)
     .then(res=>{
      // console.log("From Payment Page",res.data)
      setUserBankInfo(()=>{
        return res.data.user
      })
     }) 
     setLoading(false)
    }
    getUserBankInfo();
  },[])

  if(items.length < 1) { return <Custom404 />}
  console.log({step})
  return (
    <Wrapper>
      {!loading && <><StepBox>
        <Step bgColor={ step === 0 || step === 1}>1</Step>
        <Line bgColor={ step === 1 }/>
        <Step bgColor={ step === 1 }>2</Step>
      </StepBox>
       <Delivery userBankInfo={userBankInfo} step={(step: number) => setStep(step)} total={total}/></>}
       {loading && <><h3>Loading...</h3></>}
      {/* {step === 1 && <ConfirmPay total={total}/>} */}
    </Wrapper>
  )
}

export async function getServerSideProps({ req, res }) {
  const exits = getCookie('order-token', { req, res })
  const step = 0;

  return {
    props : { step: step }
  }
}

const Wrapper = styled.div`
  grid-column: 1/13;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  min-height: 100vh;
`

const StepBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 2rem;
`

const Step = styled.div<{bgColor: boolean}>`
  background-color: ${props => props.bgColor ?  '#565fa7': '#ffffff30'};
  border: 0;
  color: #E6E6E6;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  width: 50px;
  height: 50px;
`

const Line = styled.div<{bgColor: boolean}>`
  background-color: ${props => props.bgColor ?  '#565fa7': '#ffffff30'};
  border: 0;
  width: 100px;
  height: 10px;
`