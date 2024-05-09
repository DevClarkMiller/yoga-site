import { useContext } from "react";
import { RefContext } from "./App";

/*
*   Component: Footer
*   Brief: Holds the form which houses the email api used to send emails
*   @DevClarkMiller
*/

const Footer = () =>{
    const context = useContext(RefContext);
    const {contactRef} = context;
    return(
        <footer ref={contactRef}>
            <h1>Contact Me</h1>
            <form action=""></form>
        </footer>
    );
}

export default Footer;