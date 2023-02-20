/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
export default function Header() {
const [username, setUSername] = useState(null)

  useEffect(() => {
    fetch("http://localhost:4000/profile",{
      credentials:"include",
    
    }).then(response =>{
      response.json().then(userInfo =>{
        setUSername(userInfo.username)

      })
    })
  }, []);
  return (
    <header>
      <Link to="/" className="logo">
        My Logo
      </Link>
      <nav>
{username && (
  <>
  <Link to="/create">Create new post</Link>
  <a>Logout</a>
  </>
)}
{
  !username &&(
    <>
      <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
    </>
  )
}



  
      </nav>
    </header>
  );
}
