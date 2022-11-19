import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import {AccountBox} from '../components/accountBox'
const fetcher = ( url: string ) => axios.get(url).then(res => res.data)
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export default function Index() {
    const [domLoaded, setDomLoaded] = useState(false);
    useEffect(() => {
      setDomLoaded(true);
    }, []);


  return (
    <>
    {domLoaded && <Wrapper>
     <AppContainer>
        <AccountBox step="signin"/>
        </AppContainer>
    </Wrapper>}
    </>
  )
}
// export async function getServerSideProps() {
//     try {
    
      
//       return {
//         props: {  }
//       }
    
//     }catch(err) {
//       return {
//         props: { error: 'no response from data-base'}
//       }
//     }
//   }
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