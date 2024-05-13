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


    //INSTEAD
    /*
    Enable each of the elements in the header with menu is set to active,
    then change opacity to 100% with transition so they all still fade in properly
    remove absolute pos from ul
    isMenuActive: set nav justify-content to flex-start, set  display of h2 to none,
    */
   /*BETTER SOLUTION: REMOVE SLIDE ALL TOGETHER AND HAVE BURGER ICON FLIP HEADER INTO THE NAV/TITLE*/


    useEffect(() =>{
        /*
        if(isMenuActive){
            navTitle.current.classList.add('elementNoDisplay');
            setTimeout(() =>{
                ulRef.current.classList.add('navActive');
                liTopRef.current.classList.add('elementShow');
                liAboutRef.current.classList.add('elementShow');
                liContactRef.current.classList.add('elementShow');
                liDatesRef.current.classList.add('elementShow');
                liTopRef.current.classList.remove('elementNoDisplay');
                liAboutRef.current.classList.remove('elementNoDisplay');
                liContactRef.current.classList.remove('elementNoDisplay');
                liDatesRef.current.classList.remove('elementNoDisplay');
            }, 100)
        }else{
            //sets opacity of list items to 0
            ulRef.current.classList.remove('navActive');
            liTopRef.current.classList.remove('elementShow');
            liAboutRef.current.classList.remove('elementShow');
            liContactRef.current.classList.remove('elementShow');
            liDatesRef.current.classList.remove('elementShow');
            setTimeout(() =>{
                //Then actually removes their display
                ulRef.current.classList.remove('navActive');
                liTopRef.current.classList.add('elementNoDisplay');
                liAboutRef.current.classList.add('elementNoDisplay');
                liContactRef.current.classList.add('elementNoDisplay');
                liDatesRef.current.classList.add('elementNoDisplay');
                navTitle.current.classList.remove('elementNoDisplay');
            }, 100);     
        }*/
    }, [isMenuActive])

    const burgerToggle = () =>{
        setIsMenuActive(!isMenuActive);
    }

    return(
        <header>
            <button className="burgerMenu selfCenter" onClick={burgerToggle}>{!isMenuActive ? <RxHamburgerMenu /> : <RxCross2 />}</button>
            {/*NOTES - MAKE THE BURGER ICON THE ONLY PART OF NAV VISIBLE*/}
            <nav ref={navRef}>
                {!isMenuActive && <h2 ref={navTitle} className="navTitle">Yoga with Andrea</h2>}
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