import  Link  from 'next/link'
import Image from 'next/image'
import logo from '../../public/images/logo.png'
import bar from '../../public/images/bar.png'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import { useEffect, useState } from 'react'

export default function Header({}) {
  const key = 'USERNAME';
  const key2 = "USERPIC";
  const [username, setUsername] = useState("");
  const [profilepic, setProfilepic] = useState("");
  
  useEffect(() => {
    let cookie1: any = localStorage.getItem(key)?.toString();
    let cookie2: any = localStorage.getItem(key2)?.toString();
    setUsername(cookie1);
    setProfilepic(cookie2)
  },[]);

  const logout = () => {
    localStorage.clear();
    window.location.href="/";
  }

  return(
    <div>
    <nav className="navbar navbar-expand-lg bgx">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/"><Image className='logo' src={logo} alt="logo" /></Link>
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> */}
        <button className="navbar-toggler" type="button"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasWithBothOptions">

          <span className="navbar-toggler-icon"><Image className='burger' src={bar} alt="click" /></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-white" aria-current="page" href="/aboutus">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white active" href="/services">Services</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Products
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" href="/productlist">Sports Car</Link></li>
                <li><Link className="dropdown-item" href="/productcatalog">Delivery Trucks</Link></li>
                <li><hr className="dropdown-divider"/></li>
                <li><Link className="dropdown-item" href="/productsearch">Auto Spare Parts</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white active" href="/contactus">Contact Us</Link>
            </li>
          </ul>
          <ul className="navbar-nav mr-auto">
          {
            username != null ?
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {
                      profilepic != null ?
                          <img src={profilepic} id="userpic1" className="user" alt='' />
                      : null
                  }
                  {username}
                </a>
                <ul className="dropdown-menu">
                  <li><a onClick={logout} className="dropdown-item" href="/#">Logout</a></li>
                  <li><Link className="dropdown-item" href="/profile">Profile</Link></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><Link className="dropdown-item" href="/#">Messenger</Link></li>
                </ul>
              </li>

            :
            <>
            <li className="nav-item">
                <a className="nav-link text-white active" href="/#" data-bs-toggle="modal" data-bs-target="#staticLogin">Login</a>
            </li>
            <li className="nav-item">
                <a className="nav-link text-white active" href="/#" data-bs-toggle="modal" data-bs-target="#staticRegister">Register</a>
            </li>
            </>
          }
        </ul>

        </div>
      </div>
    </nav>
      <Login/>
      <Register/>

      {/* OFFCANVAS MENU */}
      <div className="offcanvas offcanvas-end" data-bs-scroll="true" id="offcanvasMenu" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div className="offcanvas-header bg-primary">
        <h5 className="offcanvas-title text-white" id="offcanvasWithBothOptionsLabel">Drawer Menu</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">

        <ul className="nav flex-column">
          <li className="nav-item" data-bs-dismiss="offcanvas">
            <Link className="nav-link active" aria-current="page" href="/aboutus">About Us</Link>
          </li>
          <li className="nav-item"><hr/></li>
          <li className="nav-item" data-bs-dismiss="offcanvas">
              <Link className="nav-link active" href="/services">Services</Link>
          </li>
          <li className="nav-item"><hr/></li>
          <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle active" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Products
                </a>
                <ul className="dropdown-menu">
                  <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" href="/productlist">Sports Car</Link></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" href="/productcatalog">Delivery Trucks</Link></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" href="/productsearch">Auto Spare Parts</Link></li>
                </ul>
              </li>
              <li className="nav-item"><hr/></li>
            </ul>
            { username === null ?

              <ul className="nav flex-column">
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <a className="nav-link active" href="/#" data-bs-toggle="modal" data-bs-target="#staticLogin">Login</a>
                </li>
                <li className="nav-item"><hr/></li>
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <a className="nav-link active" href="/#" data-bs-toggle="modal" data-bs-target="#staticRegister">Register</a>
                </li>            
              </ul>
            :

            <ul className="navbar-nav mr-auto">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle active" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {
                        profilepic != null ?
                            <img src={profilepic} id="userpic1" className="user" alt='' />
                        : null
                    }
                    {username}
                    </a>
                    <ul className="dropdown-menu">
                      <li data-bs-dismiss="offcanvas">
                        <a onClick={logout} className="dropdown-item" href="/#">LogOut</a>
                      </li>
                      <li className="nav-item"><hr/></li>
                      <li data-bs-dismiss="offcanvas">
                        <Link className="dropdown-item" href="/profile">Profile</Link> 
                      </li>
                      <li><hr className="dropdown-divider"/></li>
                      <li data-bs-dismiss="offcanvas">
                        <a className="dropdown-item" href="/#">Messenger</a>                
                      </li>
                    </ul>
                  </li>          
                  <li className="nav-item"><hr/></li>                                        
        </ul>        
        }


      </div>
    </div>



    </div>

 

    )
}