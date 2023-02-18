/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        My Logo
      </Link>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}
