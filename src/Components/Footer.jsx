/*
*   Component: Footer
*   Brief: Holds the form which houses the email api used to send emails
*   @DevClarkMiller
*/

import { useContext, useState, useRef } from "react";

// Components
import InputPair from "./InputPair";
import { ShakeLittle } from 'reshake';
import {useForm} from '@formspree/react';

// Icons
import { BiMailSend } from "react-icons/bi";

// Context
import { RefContext } from "../App";

const Footer = () =>{
    const context = useContext(RefContext);
    const {contactRef, topRef, scrollTo} = context;

    const buttonRef = useRef(); //Refs the send mail button

    const [state, handleSubmit] = useForm("mnqerzza");

    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [subject, setSubject] = useState(''); 
    const submit = (event) =>{
        const btn = buttonRef.current;
        event.preventDefault();
        handleSubmit(event);
        
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
            if(state.succeeded){
                alert('Message Sent!');
            }
        }, 1000);
    }
    
    return(
        <footer ref={contactRef}>
            <form className="contactForm" onSubmit={(e) => submit(e)}>
                <span style={{display: "flex", width: "100%", justifyContent: "center", alignItems: "center", marginBottom: '5px'}}>
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
                        <textarea className="p-1" value={subject} onChange={(e) => setSubject(e.target.value)}required placeholder="Write something..." name="subject" id="subject" aria-label="subject input field, aka: message body for an email"></textarea>
                    </span>
                </div>
            </form>
        </footer>
    );
}

export default Footer;