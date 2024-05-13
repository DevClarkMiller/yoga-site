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

    //Refs for elements in the nav to hide easy
    const liTopRef = useRef();
    const liAboutRef = useRef();
    const liContactRef = useRef();
    const liDatesRef = useRef();


    const [isMenuActive, setIsMenuActive] = useState(false);

    const {topRef, aboutRef, contactRef, datesRef, scrollTo} = context;

    useEffect(() =>{
        if(isMenuActive){
            navRef.current.classList.add('navActive');
            liTopRef.current.classList.add('elementShow');
            liAboutRef.current.classList.add('elementShow');
            liContactRef.current.classList.add('elementShow');
            liDatesRef.current.classList.add('elementShow');
        }else{
            navRef.current.classList.remove('navActive');
            liTopRef.current.classList.remove('elementShow');
            liAboutRef.current.classList.remove('elementShow');
            liContactRef.current.classList.remove('elementShow');
            liDatesRef.current.classList.remove('elementShow');
        }
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
                    <li className="elementHide" ref={liTopRef}><a onClick={() => scrollTo(topRef)}>Top</a></li>
                    <li className="elementHide" ref={liAboutRef}><a onClick={() => scrollTo(aboutRef)}>About</a></li>
                    <li className="elementHide" ref={liContactRef}><a onClick={() => scrollTo(contactRef)}>Contact Me</a></li>
                    <li className="elementHide" ref={liDatesRef}><a onClick={() => scrollTo(datesRef)}>Dates</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;