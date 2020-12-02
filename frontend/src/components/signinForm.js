import React from 'react'
import { Form, Button, } from 'react-bootstrap'
import {useState} from 'react'

export default function SigninForm(props) {
  const [username, setUsername] = useState("")
  const [password,setPassword]=useState("")
  

  function handleLogin(e){
    e.preventDefault();
    const data={
      "username":username,
      "password":password
    }
    fetch(props.baseUrl+"auth-token/",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    }).then(res=>res.json()).then(response=>{
      localStorage.setItem('TOKEN',response.token)
      props.setIsLoggedIn(true)
      props.setUser(username)
    })
  }

  
 
  return (
    <Form>
      <h3 className="text-center">Signin Please</h3>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter Username" 
        value={username}
        onChange={e=>setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
        />
      </Form.Group>
      <Button 
      variant="primary" 
      type="submit"
      onClick={e=>handleLogin(e)}
      >
        Submit
      </Button>
      
    </Form>
  )
}
