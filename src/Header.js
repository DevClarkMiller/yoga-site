import { useRef, useContext, useState } from 'react'
import { RefContext } from './App'
import SocialsList from './SocialsList';
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { ShakeRotate  } from 'reshake';
import './header.css'

/*
*   Component: Header
*   Brief: Main purpose is to hold the navigation links which progress your scroll bar to each point
*   @DevClarkMiller
*/

const Header = () =>{
    //Still dunno why I do this, just makes it work
    const context = useContext(RefContext);
    const navRef = useRef();

    //Refs for elements in the nav to hide easy

    const ulRef = useRef();
    const navTitle = useRef();

    const [isMenuActive, setIsMenuActive] = useState(false);

    const {topRef, aboutRef, contactRef, datesRef, scrollTo} = context;

    const burgerToggle = () =>{
        setIsMenuActive(!isMenuActive);
    }

    //Next thing to do is to add a socials pull down
    return(
        <header>
            {isMenuActive && <SocialsList />}
            <ShakeRotate r={4}>
                <button className="burgerMenu selfCenter" onClick={burgerToggle}>{!isMenuActive ? <RxHamburgerMenu /> : <RxCross2 />}</button>
            </ShakeRotate >
            {/*NOTES - MAKE THE BURGER ICON THE ONLY PART OF NAV VISIBLE*/}
            <nav ref={navRef}>
                {!isMenuActive && <h1 ref={navTitle} className="navTitle">Yoga with Andrea</h1>}
                {isMenuActive && <ul className="selfCenter" ref={ulRef}>
                    <li onClick={() => scrollTo(topRef)}>Top</li>
                    <li onClick={() => scrollTo(aboutRef)}>About</li>
                    <li onClick={() => scrollTo(contactRef)}>Contact</li>
                    <li onClick={() => scrollTo(datesRef)}>Dates</li>
                </ul>}
            </nav>
        </header>
    );
}

export default Header;