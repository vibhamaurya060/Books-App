import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{marginLeft:"100px" , display:"flex", gap:"50px",marginTop:"-350px"}}>
  
        <>
          <Link to="/">Home</Link>
          <Link to="/book">Book</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
  
    </nav>
  );
};

export default Navbar;
