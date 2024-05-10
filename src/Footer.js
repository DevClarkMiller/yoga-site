/*
*   Component: Footer
*   Brief: Holds the form which houses the email api used to send emails
*   @DevClarkMiller
*/

import { useContext, useState, useRef } from "react";
import { RefContext } from "./App";
import InputPair from "./InputPair";
import { BiMailSend } from "react-icons/bi";
import { ShakeLittle } from 'reshake'

//Mailgun seems to be having a lot of issues with their api :(
//import { MailgunModule } from "nestjs-mailgun";


const domain = 'sandbox0d032f4a3b2544e3a516cdb184fe33e3.mailgun.org';
const apiKey = '35387d67a7a1a836dad6ac9d9c380fd6-ed54d65c-667628ce';

const Footer = () =>{
    const context = useContext(RefContext);
    const {contactRef, topRef, scrollTo} = context;

    const buttonRef = useRef(); //Refs the send mail button

    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [subject, setSubject] = useState(''); 

    const submit = (event) =>{
        const btn = buttonRef.current;
        event.preventDefault();
        
        //Cleans out form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setSubject('');

        btn.classList.add('sent');
        //Swipes mail icon off screen for a second
        setTimeout(() =>{
            btn.classList.remove('sent');
            console.log('hello world');
            scrollTo(topRef);
        }, 1000);
    }
    
    return(
        <footer ref={contactRef}>
            <form className="contactForm" onSubmit={(e) => submit(e)}>
                <span style={{display: "flex", width: "100%", justifyContent: "center", alignItems: "center"}}>
                    <h2 style={{margin: "0", userSelect: "none"}}>Contact Me</h2>
                    <ShakeLittle>
                    <button  ref={buttonRef} className="sendButton" type="submit"><BiMailSend/></button>
                    </ShakeLittle>
                    
                </span>
                <div className="inputPairArea">
                    <InputPair labelText={"First Name"}  placeHolder = {"Your first name..."} id={"first"} control={firstName}
                    setControl={setFirstName} aria={'first name input field'}/>

                    <InputPair labelText={"Last Name"} placeHolder={"Your last name..."} id={"last"} control={lastName} setControl={setLastName} aria={'last name input field'}/>  

                    <InputPair labelText={"Email"} placeHolder={"Email..."} id={"email"} control={email} setControl={setEmail} inputType={'email'} aria={'email input field'}/> 

                    <span className="inputPair">
                        <label htmlFor="subject">Subject</label>
                        <textarea value={subject} onChange={(e) => setSubject(e.target.value)}required placeholder="Write something..." name="subject" id="subject" aria-label="subject input field, aka: message body for an email"></textarea>
                    </span>
                </div>
            </form>
        </footer>
    );
}

export default Footer;