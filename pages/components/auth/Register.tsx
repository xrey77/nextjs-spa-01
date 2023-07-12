import React, { useState } from 'react'

const Register = ({}) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const closeRegistration = () => {
      setFirstname("");
      setLastname("");
      setEmail("");
      setMessage("");
      setMobile("");
      setUsername("");
      setPassword("");
    }

    const submitRegistration = async (e: any) => {
        e.preventDefault();
        let response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "mobile": mobile,
            "username": username,
            "password": password})            
        }).catch((e) => {
          setMessage(e.message);
          return;
        });

        const result = await response?.json()
        if (result.statuscode == 200) {
          setMessage(result.message)
          window.setTimeout(() => {
            setMessage("");
          }, 3000);
        } else {
          setMessage(result.message)
          window.setTimeout(() => {
            setMessage("");
          }, 3000);
        }

    }

  return (
<div className="modal fade" id="staticRegister" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticRegisterLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header bg-danger">
        <h1 className="modal-title fs-5 text-white" id="staticRegistgerLabel">Account Registration</h1>
        <button onClick={closeRegistration} type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <form onSubmit={submitRegistration}>

            <div className="row">
             <div className="col">
                <div className="mb-3">
                    <input type="text" required className="form-control" value={firstname} onChange={e => setFirstname(e.target.value)} autoComplete='off' placeholder="enter First Name"/>
                </div>           
              </div>
              <div className="col">  
                <div className="mb-3">
                    <input type="text" required className="form-control" value={lastname} onChange={e => setLastname(e.target.value)} autoComplete='off' placeholder="enter Last Name"/>
                </div>                          
              </div>
            </div>

            <div className="row">
             <div className="col">
                <div className="mb-3">
                    <input type="email" required className="form-control" value={email} onChange={e => setEmail(e.target.value)} autoComplete='off' placeholder="enter Email Address"/>
                </div>           
              </div>
              <div className="col">  
                <div className="mb-3">
                    <input type="text" required className="form-control" value={mobile} onChange={e => setMobile(e.target.value)} autoComplete='off' placeholder="enter Mobile No."/>
                </div>                          
              </div>
            </div>


            <div className="row">
             <div className="col">
                <div className="mb-3">
                    <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} autoComplete='off' placeholder="enter Username"/>
                </div>           
              </div>
              <div className="col">  
                <div className="mb-3">
                    <input type="text" className="form-control" value={password} onChange={e => setPassword(e.target.value)} autoComplete='off' placeholder="enter Password"/>
                </div>                          
              </div>
            </div>
            <button type="submit" className="btn btn-danger text-white">register</button>
        </form>

      </div>
      <div className="modal-footer">
            <div id="registerMsg" className="w-100 text-left text-danger">{message}</div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Register;