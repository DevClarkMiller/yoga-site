/*
*   Component: Footer
*   Brief: Holds the form which houses the email api used to send emails
*   @DevClarkMiller
*/

import { useContext, useState, useRef } from "react";
import { RefContext } from "./App";
import InputPair from "./InputPair";
import { BiMailSend } from "react-icons/bi";
//Mailgun seems to be having a lot of issues with their api :(
//import { MailgunModule } from "nestjs-mailgun";


const domain = 'sandbox0d032f4a3b2544e3a516cdb184fe33e3.mailgun.org';
const apiKey = '35387d67a7a1a836dad6ac9d9c380fd6-ed54d65c-667628ce';

const Footer = () =>{
    const context = useContext(RefContext);
    const {contactRef, topRef, scrollTo} = context;

    const buttonRef = useRef();

    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [subject, setSubject] = useState(''); 

    const submit = (event) =>{
        event.preventDefault();
        scrollTo(topRef);

        console.log(`First Name: ${firstName}`);
        console.log(`Last Name: ${lastName}`);
        console.log(`Email: ${email}`);
        console.log(`Subject: ${subject}`);

        //Cleans out form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setSubject('');
    }
    
    return(
        <footer ref={contactRef}>
            <form className="contactForm" onSubmit={(e) => submit(e)}>
                <span style={{display: "flex", width: "100%", justifyContent: "center", alignItems: "center", gap: "5%"}}>
                    <h2>Contact Me</h2>
                    <button ref={buttonRef} className="sendButton" type="submit"><BiMailSend/></button>
                </span>
                <div className="inputPairArea">
                    <InputPair labelText={"First Name"}  placeHolder = {"Your first name..."} id={"first"} control={firstName}
                    setControl={setFirstName}/>

                    <InputPair labelText={"Last Name"} placeHolder={"Your last name..."} id={"last"} control={lastName} setControl={setLastName}/>  

                    <InputPair labelText={"Email"} placeHolder={"Email..."} id={"email"} control={email} setControl={setEmail}/> 

                    <span className="inputPair">
                        <label htmlFor="subject">Subject</label>
                        <textarea value={subject} onChange={(e) => setSubject(e.target.value)}required placeholder="Write something..." name="subject" id="subject"></textarea>
                    </span>
                </div>
            </form>
        </footer>
    );
}

export default Footer;