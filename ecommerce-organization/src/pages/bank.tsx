import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import { BoxContainer, FormContainer, Input, SubmitButton, MutedLink, BoldLink } from '../components/accountBox/common'
import { Marginer } from '../components/marginer'
import signup from './signup'
import { useRouter } from 'next/router'
import cookie from 'js-cookie'

const fetcher = (url: string) => axios.get(url).then(res => res.data)
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export default function Index() {
    const router = useRouter();
    const [domLoaded, setDomLoaded] = useState(false);
    const _email = cookie.get('email')
    console.log({_email})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setDomLoaded(true);
    }, []);
    useEffect(()=>{
        const getBankInfo = async ()=>{
            setLoading(true);
            const get = await axios.get('/api/bank', {params:{email:_email}})
            if(get && get?.data && get?.data?.user ){
                if(get?.data?.user.Account_Number){
                    router.push('/products').then(()=>setLoading(false)).catch(()=>setLoading(false))
                }
                else{
                    setLoading(false)
                }
                
            }
            else{
                setLoading(false)
            }
        }
        getBankInfo();

    },[])
    const [Bank_Name, setBankName] = useState();
    const [Account_Number, setAccountName] = useState();
    const [email, setEmail] = useState();
    const [Secret_Code, setSecretCode] = useState();
    // const [confirmPassword, setConfirmPassword] = useState();

    const BankInformation = async () => {
        try {
            const userData = { Bank_Name, Account_Number, email, Secret_Code }
            const post = await axios.post('/api/bank', userData)
            if (post.status === 200) {
                
                router.push("/")
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            {domLoaded && <Wrapper>
                <AppContainer>
                    {!loading && <BoxContainer style={{width:"500px"}}>
                        <FormContainer >
                            <Input type="text" name="Bank_Name" placeholder="Bank Name" onChange={(e) => setBankName(e.target.value)} />
                            <Input type="text" name="Account_Number" placeholder="Account Number" onChange={(e) => setAccountName(e.target.value)} />
                            <Input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            <Input type="password" name="Secret_Code" placeholder="Secret Code" onChange={(e) => setSecretCode(e.target.value)} />
                           
                        </FormContainer>
                        <Marginer direction="vertical" margin={10} />
                        <SubmitButton type="submit" onClick={async () => await BankInformation()} >Bank</SubmitButton>
                        <Marginer direction="vertical" margin="1em" />
                    </BoxContainer>}
                    {loading && <>
                    
                        <h2>Loading...</h2>
                    </>}
                </AppContainer>
            </Wrapper>}
        </>
    )
}
export async function getServerSideProps() {
    try {


        return {
            props: {}
        }

    } catch (err) {
        return {
            props: { error: 'no response from data-base' }
        }
    }
}
const Wrapper = styled.main`
  grid-column: 1/13;
  padding-top: 2rem;
  min-height: 80vh;
`

const Box = styled.section`
  margin-bottom: 3rem;
  position: relative;
  width: 100vw;
`

const Products = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 3rem;

  width: 100%;
  height: 100%;
`