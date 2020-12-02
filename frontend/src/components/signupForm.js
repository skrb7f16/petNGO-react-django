import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'

export default function SignupForm(props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstname] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg,setAlertMsg]=useState("")
  const [alertColor,setAlertColor]=useState("danger")


  function handleSignup(e) {
    e.preventDefault();
    const data = {
      "username": username,
      "password": password,
      "first_name": firstName,
      "last_name": lastName,
      "email": email
    }
    fetch(props.baseUrl + "api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (res.status === 201) {
        res.json().then(response => {
          console.log(response)
          setAlertMsg(response.msg)
          setAlertColor("success")
          setShowAlert(true)
        })
      }
      else if (res.status === 403) {
        setAlertMsg("Username Already Exists")
        setShowAlert(true)
      }
      else {
        setAlertMsg("Some Server error pls try Again later")
        setShowAlert(true)
      }
    }).catch(e=>{
      setAlertMsg("Sorry Failed to connect to server")
      setShowAlert(true)
    })
  }


  return (
    <Form>

      <Alert variant={alertColor} onClose={() => setShowAlert(false)} dismissible className={showAlert?'':'d-none'}>
        <Alert.Heading>Oh snap! {alertMsg}!</Alert.Heading>
      </Alert>


      <Form.Group controlId="formBasicEmailS">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
          </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicUsernameS">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicFnameS">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter First Name"
          value={firstName}
          onChange={e => setFirstname(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicLnameS">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPasswordS">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={e => handleSignup(e)}
      >
        Submit
        </Button>
    </Form>
  )
}
