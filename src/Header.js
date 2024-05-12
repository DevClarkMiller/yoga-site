import { Link, useNavigate } from "react-router-dom";
import { useRef, useContext, useEffect, useState } from 'react'
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
    const navRef = useRef();

    const [isMenuActive, setIsMenuActive] = useState(false);

    const {topRef, aboutRef, contactRef, datesRef, scrollTo} = context;

    useEffect(() =>{
        (isMenuActive) ? navRef.current.classList.add('navActive') : navRef.current.classList.remove('navActive');
    }, [isMenuActive])

    const burgerClick = () =>{
        setIsMenuActive(!isMenuActive);
    }

    return(
        <header>
            {/*NOTES - MAKE THE BURGER ICON THE ONLY PART OF NAV VISIBLE*/}
            <nav ref={navRef}>
                <ul>
                    <li><GiHamburgerMenu className="burgerMenu" onClick={burgerClick}/></li>
                    <li><a onClick={() => scrollTo(topRef)}>Top</a></li>
                    <li><a onClick={() => scrollTo(aboutRef)}>About</a></li>
                    <li><a onClick={() => scrollTo(contactRef)}>Contact Me</a></li>
                    <li><a onClick={() => scrollTo(datesRef)}>Dates</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;