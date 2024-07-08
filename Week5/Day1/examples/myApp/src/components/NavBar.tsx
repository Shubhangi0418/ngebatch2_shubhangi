import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/aboutus">About Us</Link>{" "}
      <Link to="/contactus">Contact Us</Link> 
      <Link to="/blog">Blog</Link>{" "}
    </nav>
  );
}
