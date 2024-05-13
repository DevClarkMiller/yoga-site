import { useNavigate } from "react-router-dom";
import { useRef, useContext, useEffect, useState } from 'react'
import { RefContext } from './App'
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import './header.css'



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

    //Refs for elements in the nav to hide easy
    const liTopRef = useRef();
    const liAboutRef = useRef();
    const liContactRef = useRef();
    const liDatesRef = useRef();

    const ulRef = useRef();
    const navTitle = useRef();

    const [isMenuActive, setIsMenuActive] = useState(false);

    const {topRef, aboutRef, contactRef, datesRef, scrollTo} = context;

    const burgerToggle = () =>{
        setIsMenuActive(!isMenuActive);
    }

    return(
        <header>
            <button className="burgerMenu selfCenter" onClick={burgerToggle}>{!isMenuActive ? <RxHamburgerMenu /> : <RxCross2 />}</button>
            {/*NOTES - MAKE THE BURGER ICON THE ONLY PART OF NAV VISIBLE*/}
            <nav ref={navRef}>
                {!isMenuActive && <h1 ref={navTitle} className="navTitle">Yoga with Andrea</h1>}
                {isMenuActive && <ul className="selfCenter" ref={ulRef}>
                    <li ref={liTopRef} onClick={() => scrollTo(topRef)}>Top</li>
                    <li ref={liAboutRef} onClick={() => scrollTo(aboutRef)}>About</li>
                    <li ref={liContactRef} onClick={() => scrollTo(contactRef)}>Contact Me</li>
                    <li ref={liDatesRef} onClick={() => scrollTo(datesRef)}>Dates</li>
                </ul>}
                
            </nav>
        </header>
    );
}

export default Header;