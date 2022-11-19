import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useRouter } from "next/router";
import axios from "axios";
import cookie from 'js-cookie'

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const router = useRouter();

  const signin = async ()=>{
    try{
      const userData = { email, password}
    const post = await axios.post('/api/signin', userData)
    const {data} =post
    console.log("From login page",data)
        if( post.status === 200 ) {
          console.log("HERE")
          cookie.set('email',data.user.email,{ expires: 7 })
          router.push('/bank')
        }
    }
    catch(e){
      console.log(e)
    }
  }
  return (
    <BoxContainer>
      <FormContainer>
        
        <Input type="email" name="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
        <Input type="password" name ="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      
      <SubmitButton type="submit" onClick={async()=>await signin()} > Signin </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={()=>router.push('/signup')}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
