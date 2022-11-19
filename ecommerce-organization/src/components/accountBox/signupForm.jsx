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
import axios from "axios";
import { useRouter } from "next/router";

export function SignupForm(props) {
  // const { switchToSignin } = useContext(AccountContext);
  const router = useRouter();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const signup = async ()=>{
    try{
      const userData = {name, email, password}
    const post = await axios.post('/api/signup', userData)
        if( post.status === 200 ) {
          // switchToSignin()
          router.push('signin');
        }
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <BoxContainer>
      <FormContainer >
        <Input type="text" name="Full_Name" placeholder="Full Name" onChange={(e)=>setName(e.target.value)} /> 
        <Input type="email" name="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
        <Input type="password" name ="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        <Input type="password" name="password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
        
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
        <SubmitButton type="submit" onClick={async()=>await signup()} >Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={()=>router.push('/signin')}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
