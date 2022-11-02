import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailValid } from '../../../utilities/validetion/validetion.js';
import axios from "axios";
import './Forgetpassword.css';

export default function Forgetpassword() {


const navigate = useNavigate();
const [email,setEmail]= useState('');

const submit =async()=>{
  
    if(!email || !emailValid(email)){
      alert('please add an valid email');
    }
    else{
      try {
        const answer = await axios.post('http://localhost:3002/auth/forget-pass', { email })
        console.log(answer);
        navigate('/resetPassword');

    }
    catch (err) {
        console.log(err)
        alert('email sent successfully')
    } 
    }
  
}

  return (
    <div className='Forgetpassword'>
      <p>forget Password</p>
      <input type="email" value={email} onChange={(event) => { setEmail(event.target.value) }} placeholder="email" />
      <button onClick={submit}>Reset</button>
    </div>
  )
}


