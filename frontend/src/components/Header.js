import React from 'react';
import logoHeader from '../images/logo.svg';

function Header(props) {
   return (
      <header className="header">
         <a className="header__link" href="#" target="_blank">
            <div className="header__logo"
               style={{
                  backgroundImage: `url(${logoHeader})`
               }} ></div>
         </a>
         <nav className="header__menu">{props.children}</nav>
      </header>
   );
}
export default Header;