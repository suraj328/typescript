import React from 'react';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';

function App() {
  return (
    <>
    <div>
      <div className='bg-[#dc9512] flex flex-row justify-start gap-3'>
          <div className="ml-[5%]">
              <svg className=" inline w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                <path d="M12 0H2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM7.5 17.5h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2ZM12 13H2V4h10v9Z"/>
              </svg>
            </div>
          <div className=""><a href="tel:15901003">15901003</a></div>
          <div className=""><a href="mailto:info@khaniho.com">info@khanih0.com</a></div>
      </div>
      <Navbar className='bg-[#ffffff] p-2' fluid >
      <NavbarBrand  href="https://flowbite-react.com">
        <img src="https://khaniho.com//static/media/logo9-removebg-preview.758cf896bccab7c7ad3b.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink  href="#">
          About
        </NavbarLink>
        <NavbarLink >Services</NavbarLink>
        <NavbarLink >Pricing</NavbarLink>
        <NavbarLink >Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
    </div>
    </>
  );
}
export default App;
