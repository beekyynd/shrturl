import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.min.js";

import "../App.css";

const Navbar = () => {

  return (

    <>
    
<nav className="navbar navbar-expand-lg navbar-light bg-light">

<div className="container-fluid">

<a className="navbar-brand" href="/">Shrt.ng</a>

<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">

<span className="navbar-toggler-icon"></span>

</button>

<div className="collapse navbar-collapse" id="navbarTogglerDemo01">

<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
    
<li className="nav-item ms-3">

    <a className="nav-link active" aria-current="page" href="create">Home</a>

</li>

<li className="nav-item ms-3">

    <a className="nav-link" href="#">Login</a>

</li>

<li className="nav-item ms-3">

    <button type='button' className='rounded btn btn-primary btn-sm mt-1'>Get Started</button>

</li>

</ul>

</div>
</div>
</nav>

</>



  )
}

export default Navbar