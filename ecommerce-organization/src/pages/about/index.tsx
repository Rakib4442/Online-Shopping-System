import Head from 'next/head'
import styled from 'styled-components'

export default function About() {
  return (
    <>
     <Head>
        <meta name='title' content='NextJs Coffe Store' />
        <meta name='description' content='This is a demo ecommerce site made with NextJs framework'/>
        <meta name='keywords' content='Github,Next,Nextjs,Ecommerce,Coffe,React,Mongodb'/>
        <meta name='robots' content='index, nofollow'/>
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8'/>
        <meta name='language' content='English'/>
      </Head>
      <Wrapper>
        <Box>
          <Container>
            <h2>About This Site</h2>
            <span>This is My first e-commerce site, and first project on <b>NextJs </b> </span>
            <span>Is made with :</span>
            <ol>
              <li>Nextjs framework.</li>
              <li>Basic Swr</li>
              <li>MongoDB as database.</li>
              
            </ol>
          </Container>

          {/* <Container>
            <h2>To Test Pay Method use:</h2>
            <span><b>Credit Cart: </b>4051885600446623</span>
            <span><b>Rut: </b>11.111.111-1</span>
            <span><b>Password: </b>123</span>
          </Container> */}
          

          <a href='https://github.com/Rakib4442/API-PROJECT' target='_blank'>
            My GitHub →
          </a>
        </Box>

        <Box>
          <Container>
            <h2>Info</h2>
            <span className='note'>
            Soon I will add validation between stock and items on the cart.
            </span>
          </Container>
          <Container>
            <h2>What can this site do</h2>
            <span>This site can :</span>
            <ol>
              <li>A user first registers and then logs in to the e-commerce website. After a successful
login, the user lands into the home page.</li>
              <li>When in the home page for the first time, the user needs to set up his/her bank
information (account number) and add a secret which can be used to transact with
the bank.</li>
              <li>The user can view and buy the products from a corresponding page.</li>
              <li>The user chooses products from these three products and decides to buy them.</li>
              <li>The amount required to buy them is calculated and a transaction request is sent to
the bank with other bank information related to the user.</li>
              <li>The bank settles the transaction and returns a transaction number to the e-Commerce
website.</li>
              <li>The e-commerce website interacts with the bank similarly to transfer the required
amount from its account to the supplier’s account.</li>
              <li>The bank settles the transaction and returns a transaction number to the e-Commerce
website.</li>
              <li>The e-commerce website submits a request of the ordered products to the supplier
with the transaction number.</li>
<li>The e-commerce organisation updates its record so that the user can see that the
chosen products have been supplied..</li>
<li>The e-commerce website submits a request of the ordered products to the supplier
with the transaction number.</li>
            </ol>
          </Container>
        </Box>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  grid-column: 2/12;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem 0;
  min-height: 100vh;
`

const Box = styled.section`
  background-color: #121212cc;
  border-radius: .6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
  padding: 2rem;

  width: 100%;

  @media screen and ( max-width: 900px ) {
    font-size: .8rem;
  }

  @media screen and ( max-width: 600px ) {
    font-size: .66rem;
  }

  .note {
    display: inline;
    color: #cfbe00;
    font-weight: 700;
    border-radius: .2rem;
    padding: 0 .6rem;
    width: fit-content;
  }

  a {
    align-self: flex-end;
    display: block;
    color: #ce5cff;
    font-size: 1.3rem;
    font-weight: 600;
    position: relative;
    text-decoration: none;

    @media screen and ( max-width: 600px ) {
      font-size: 1rem;
    }

    &:hover {
      text-decoration: underline;
    }
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: .6rem;
  
  h2 {
    color: #ffffff;
    font-weight: 700;
    text-transform: capitalize;
  }

  span {
    font-weight: 500;
  }

  ol {
    display: flex;
    flex-direction: column;
    gap: .6rem;
    list-style: inside;

    & > li {
      text-indent: 20px;
      
    }
  }
`