import React from 'react';
import {NavLink, Outlet} from 'react-router-dom';

const Rootlayout = () => {
  return (
    <div className='root-layout'>
    <header>
   <nav>

      <NavLink to="/">Form</NavLink>
      <NavLink to="Addrlist">List</NavLink>
    
   </nav>
 </header>
 
 <main>
     <Outlet />
 </main>
 </div>
  )
}

export default Rootlayout
