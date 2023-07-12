import React, { useState } from 'react'
import Mfa from './Mfa';
import $ from 'jquery';

const Login = ({}) => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [message, setMessage] = useState("");
   const [dizable, setDizable] = useState(false);

    const submitLogin = async (e: any) => {
        e.preventDefault();
        setDizable(true);
        setMessage("Please wait..");
        let response = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "username": username,
            "password": password})            
        }).catch((e: any) => {
          setMessage(e.message);
          setDizable(false);
          return;
        });

        const result = await response?.json()
        if (result.statuscode == 200) {
          setMessage(result.message);
          localStorage.setItem('USERID', result.id);
          localStorage.setItem('TOKEN', result.token);
          localStorage.setItem('USERPIC', result.profilepic);
          localStorage.setItem('FULLNAME', "TOYOTA (" + result.firstname + ' ' + result.lastname + " )");
          if (result.qrcodeurl !== '') {
            $("#mfa").click();
            return;
          }

          localStorage.setItem('USERNAME', result.username);
          window.setTimeout(() => {
            setMessage("");
            window.location.href="/";
          }, 3000);
        } else {
          setMessage(result.message);
          window.setTimeout(() => {
            setMessage("");
          }, 3000);
          setDizable(false);
        }        
    }

    const closeLogin = () => {
      setUsername("");
      setPassword("");
    }

  return (
    <>
    <Mfa/>

<div className="modal fade" id="staticLogin" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticLoginLabel" aria-hidden="true">
  <div className="modal-dialog modal-sm modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header bg-primary">
        <h1 className="modal-title fs-5 text-white" id="staticLoginLabel">User's Signin</h1>
        <button onClick={closeLogin} type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={submitLogin}>
            <div className="mb-3">
                <input disabled={dizable} type="text" required className="form-control" value={username} onChange={e => setUsername(e.target.value)} autoComplete='off' placeholder="enter Username"/>
            </div>            
            <div className="mb-3">
                <input disabled={dizable} type="password" required className="form-control" value={password} onChange={e => setPassword(e.target.value)} autoComplete='off' placeholder="enter Password"/>
            </div>            

            <button disabled={dizable} type="submit" className="btn btn-primary">signin</button>
            <button id="mfa" type="button" className="btn btn-primary hide-mfa" data-bs-toggle="modal" data-bs-target="#staticMFA">MFA</button>

        </form>
      </div>
      <div className="modal-footer">
        <div id="loginMsg" className="w-100 text-left text-danger">{message}</div>
      </div>
    </div>
  </div>
</div>
</>
    )

  }
  
export default Login;