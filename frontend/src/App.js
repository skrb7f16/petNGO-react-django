import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Header from './components/Navbar'
import SigninForm from './components/signinForm'
import SignupForm from './components/signupForm'
import Donations from './components/donation'
import Reports from './components/report'


function fetchUser(setUser){
  fetch("http://localhost:8000/api/currentUser",{
    method:"GET",
    headers:{
      "Content-Type":"appilcation/json",
      Authorization: `Token  ${localStorage.getItem('TOKEN')}`
    }
  }).then(res=>res.json()).then(response=>setUser(response))
}

function App() {
  let baseUrl = "http://localhost:8000/"

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('TOKEN') ? true : false)
  const [loginForm, setLoginForm] = useState(true)
  const [user,setUser]=useState({})
   useEffect(()=>{
     if(isLoggedIn){
       fetchUser(setUser)
     }
   },[isLoggedIn])
  
  return (
    <>
      <Header user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>
      <div className={isLoggedIn ? 'd-none' : 'container'}>
        <div className="d-flex container my-3 p-2">
          <Button className="mx-3" onClick={e => setLoginForm(true)}>Sigin</Button>
          <Button className="mx-3" onClick={e => setLoginForm(false)}>Signup</Button>
        </div>
        {loginForm?<div>
          <SigninForm baseUrl={baseUrl} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
        </div>:<div className={!loginForm ? 'conatainer' : 'd-none'}>
          <SignupForm baseUrl={baseUrl} loginForm={loginForm} />
        </div>}
        
        
      </div>
        <h1 className={!isLoggedIn ? 'd-none' : 'text-center'}>Hello {user.username}</h1>
      {isLoggedIn?<div>
        <Donations isLoggedIn={isLoggedIn} baseUrl={baseUrl}/>
      </div>:null}
      {isLoggedIn?<div>
        <Reports isLoggedIn={isLoggedIn} baseUrl={baseUrl}/>
      </div>:null}
      
    </>
  );
}

export default App;
