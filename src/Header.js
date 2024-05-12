import { Link, useNavigate } from "react-router-dom";
import { useRef, useContext, useEffect } from 'react'
import { RefContext } from './App'
import { GiHamburgerMenu } from "react-icons/gi";

/*
*   Component: Header
*   Brief: Main purpose is to hold the navigation links which progress your scroll bar to each point
*   @DevClarkMiller
*/

const Header = () =>{
    //Still dunno why I do this, just makes it work
    const navigate = useNavigate();
    const context = useContext(RefContext);

    const {topRef, aboutRef, contactRef, datesRef, scrollTo} = context;
    return(
        <header>
            <nav>
                <ul>
                    <li><a onClick={() => scrollTo(topRef)}>Top</a></li>
                    <li><a onClick={() => scrollTo(aboutRef)}>About</a></li>
                    <li><a onClick={() => scrollTo(contactRef)}>Contact Me</a></li>
                    <li><a onClick={() => scrollTo(datesRef)}>Dates</a></li>
                </ul>
            </nav>

            {/*NOTES  - HAVE BURGER MENU BUTTON SLIDE NAV OPTIONS OUT*/}
            <GiHamburgerMenu />
        </header>
    );
}

export default Header;