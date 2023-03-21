import React, { useState } from 'react'
import {useNavigate}  from "react-router-dom"
import "./login.css"
function Login() {
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()
  const handleclick=()=>{
    if (name && password)
    {
      if (name === "foo" && password=== "bar"){
        localStorage.setItem("isLogin",true)
        navigate("/home")
      }
      else{
        showdetail("enter correct details")
      }
    }
    else{
      showdetail("enter all details")
    }
  }

  function showdetail(msg){
    const extra=document.getElementById("extra")
    extra.innerHTML=`${msg}`
    setTimeout(()=>{
      extra.innerHTML=``
      setName("")
        setPassword("")
    },2000)
    
  }
  
  return (
    <main className='login-pg'>
      <div class="login-container">
        <div class="login-header">
          <h1>Login</h1>
        </div>
        <section class="login-inp">
          <label htmlFor='name'>
            <h4>Username</h4>
            <input type="name" name="name"  onChange={(e) => { setName(e.target.value) }}></input>
          </label>
          <label htmlFor='password'>
            <h4>Password</h4>
            <input type="text" name="password" id="password" onChange={(e) => { setPassword(e.target.value) }}></input>
          </label>
            <button className='submit-btn' onClick={()=>handleclick()}>submit</button>
          <div id='extra' ></div>
        </section>
      </div>

    </main>
  )
}

export default Login