import React, { useEffect, useState } from 'react'
import $ from 'jquery/dist/jquery.slim';
import Image from 'next/image'

export default function Profile({}) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfpassword] = useState("");
  const [message, setMessage] = useState("");
  const [userid, setUserid] = useState('');
  const [profilepic, setProfilepic] = useState('');
  const [qrcode, setQrcode] = useState('');
  const [userfile, setUserfile] = useState<File>();

  let user: any = [];


  const fetchData = async (xid: any) => {
    setMessage("Pls wait, retrieving data..")
    const res = await fetch(`/api/user/getbyid?id=${xid}`);
    res.json().then(data => {
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setEmail(data.email);
      setMobile(data.mobile);
      setProfilepic(data.profilepic);
      setQrcode(data.qrcodeurl);
    })
  }
  
  useEffect(() => {
    $("#cpwd").hide();
    $("#qcode").hide();
    $("#qcode-info").hide();
    var xid = localStorage.getItem('USERID')?.toString();
    setUserid(xid?.toString() || '');
    fetchData(xid);
    setMessage("");
  },[]);

  const updateProfile = async (e: any) => {
    e.preventDefault();
    var xid = localStorage.getItem('USERID')?.toString();

    if (password !== confpassword) {
      setMessage("New Password does not matched.");
      window.setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    let response = await fetch('/api/user/updatebyid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id": xid,
        "lastname": lastname,
        "firstname": firstname,
        "password": password})            
    }).catch((e: any) => {
      setMessage(e.message);
      return;
    });
    
    const result = await response?.json()
    if (result.statuscode == 200) {
      setMessage(result.message);
    } else {
      setMessage(result.message);
    }


  }

  const changePwd = () => {
    if ($('#chgPwd').is(":checked")) {    
      $('#mfacode').prop('checked', false);
      $("#qcode-info").hide();
      $("#qcode").hide();
      $("#cpwd").show();
    } 
    else {
      $("#cpwd").hide();
    }
  }

  const enableMFA = () => {
    if ($('#mfacode').is(":checked")) {    
      if ($('#chgPwd').is(":checked")) {    
        setPassword("");
        setConfpassword("");
        $('#chgPwd').prop('checked', false);
        $("#cpwd").hide();
      }
      $("#qcode").show();
      $("#qcode-info").show();
    } else {
      $("#qcode").hide();
      $("#qcode-info").hide();
    }
  }

  const changeProfilepic = async (e: any) => {  
    e.preventDefault();
    $("#userpic").attr('src',URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];
    setUserfile(file);

    var xid = localStorage.getItem('USERID')?.toString();
    const formdata = new FormData();
    formdata.append('userid', xid || '');
    formdata.append('myImage', file);
    await fetch(`/api/user/changeprofilepic?id=${xid}`, {
      body: formdata,
      method: "post",
    }).then(async (result) => {

      let data = await result.json()
      if (data.statuscode == 200) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
      window.setTimeout(() => {
        setMessage("");
        window.location.reload();
      }, 3000);  
      
    }).catch((e: any) => {
      setMessage(e.message);
      return;
    });  
  }

  const activateMFA = async () => {
    var xid = localStorage.getItem('USERID')?.toString();
    var xfname = localStorage.getItem('FULLNAME')?.toString();

    let response = await fetch('/api/user/activatemfa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id": xid,
        "fullname": xfname,
        "isactivate": true})            
    }).catch((e: any) => {
      setMessage(e.message);
      return;
    });  
    const result = await response?.json()
    if (result.statuscode == 200) {
      setMessage(result.message);
    } else {
      setMessage(result.message);
    }
    window.setTimeout(() => {
      setMessage("");
      window.location.reload();
    }, 3000);
  }

  const deactivateMFA = async () => {
    var xid = localStorage.getItem('USERID')?.toString();
    let response = await fetch('/api/user/activatemfa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id": xid,
        "isactivate": false})            
    }).catch((e: any) => {
      setMessage(e.message);
      return;
    });
    const result = await response?.json()
    if (result.statuscode == 200) {
      setMessage(result.message);
    } else {
      setMessage(result.message);
    }
    window.setTimeout(() => {
      setMessage("");
      window.location.reload();
    }, 3000);
  }

  return (
    <div className='container'>
      <div className="card mt-4 mb-10">
        <div className='card-header'>
             <strong>USER PROFILE ID NO.</strong>&nbsp; {userid}
        </div>
        <div className="card-body">

          <form onSubmit={updateProfile} encType='multipart/form-data' autoComplete='off' method='POST'>
            <div className='row'>
              <div className='col'>
                <div className="mb-3">
                  <label htmlFor="firstname" className="form-label">First Name</label>
                  <input type="text" className="form-control" value={firstname} onChange={e => setFirstname(e.target.value)}/>
                </div>            
                <div className="mb-3">
                  <label htmlFor="lastname" className="form-label">Last Name</label>
                  <input type="text" className="form-control" value={lastname} onChange={e => setLastname(e.target.value)}/>
                </div>            
              </div>
              <div className='col'>
                  <Image id="userpic" className='userprofile' src={profilepic} alt=''/>
                    <div className="mb-3 mt-2">
                      <input type="file" onChange={e => changeProfilepic(e)} className="form-control form-control-sm" id="profilepic"/>
                    </div>                                    
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" readOnly className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>            
              </div>
              <div className='col'>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Mobile No.</label>
                  <input type="text" className="form-control" value={mobile} onChange={e => setMobile(e.target.value)}/>
                </div>            
              </div>              
            </div>

            <div className='row'>
              <div className='col'>

                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" onChange={changePwd} id="chgPwd"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Change Password
                    </label>
                  </div>
                  <div id="cpwd">
                     <div className="mb-3">
                       <input type="text" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder='enter new password.'/>
                     </div>            
                     <div className="mb-3">
                       <input type="text" className="form-control" value={confpassword} onChange={e => setConfpassword(e.target.value)} placeholder='enter new password confirmation.'/>
                     </div>            
                  </div> 
                  <div id="qcode">
                    {
                      qrcode != '' ?
                        <Image className='qrcode2' src={qrcode} alt='' />
                    :
                        <Image className='qrcode1' src="/images/qrcode.png" alt='' />
                    }
                  </div>
              </div>
              <div className='col'>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" onChange={enableMFA} id="mfacode"/>
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                      2-Factor Authentication
                  </label>
                </div>
                <div id="qcode-info">
                    <p className='text-danger'><strong>Requirements</strong></p>
                    <p>You need to install <strong>Google or Microsoft Authenticator</strong> in your Mobile Phone, once installed, click Enable Button below, and <strong>SCAN QR CODE</strong>, next time you login, another dialog window will appear, then enter the <strong>OTP CODE</strong> from your Mobile Phone in order for you to login.</p>
                    <div className='row'>
                      <div className='col-2'>
                        <button onClick={activateMFA} type="button" className='btn btn-primary'>Enable</button>
                      </div>
                      <div className='col-2'>
                        <button onClick={deactivateMFA} type="button" className='btn btn-secondary'>Disable</button>                        
                      </div>
                    </div>
                </div>
              </div>              
            </div>

            <button type='submit' className='btn btn-primary mt-3'>save</button>
          </form>    
        </div>
        <div className='card-footer text-danger'>
          {message}
        </div>
      </div>
      <br/><br/>

    </div>
  )
}