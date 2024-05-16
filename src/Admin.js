import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowDownSquare, BsArrowDownSquareFill } from "react-icons/bs";
import api from './ConfigFiles/api'

const Admin = ({setIsAdmin, datesHeader, setDatesHeader, datesFooter, setDatesFooter}) =>{
    const [submit, setSubmit] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [editTitle, setEditTitle] = useState('');
    const [editSubtitle, setEditSubtitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editHeaderDay, setEditHeaderDay] = useState('');
    const [editHeaderMonth, setEditHeaderMonth] = useState('');
    const [editHeaderDaysAvailable, setEditHeaderDaysAvailable] = useState('');
    const [editHeaderTimes, setEditHeaderTimes] = useState('');
    const [editOrgName, setEditOrgName] = useState('');
    const [editLocation, setEditLocation] = useState('');
    const [editFee, setEditFee] = useState('');
    const [editHeaderColour, setEditHeaderColour] = useState('');

    const [editFooterDay, setEditFooterDay] = useState('');
    const [editFooterMonth, setEditFooterMonth] = useState('');
    const [editFooterDaysAvailable, setEditFooterDaysAvailable] = useState('');
    const [editFooterTimes, setEditFooterTimes] = useState('');
    const [editFooterColour, setEditFooterColour] = useState('');


    //Will only do this if the datesHeader and datesFooter objects are loaded
    useEffect(()=>{
        setIsAdmin(true);        
        if(datesHeader && datesFooter){
            //Sets all the initial values for the input fields
            setEditTitle(datesHeader.title);
            setEditSubtitle(datesHeader.subtitle);
            setEditDescription(datesHeader.description);
            setEditHeaderDay(datesHeader.day);
            setEditHeaderMonth(datesHeader.month);
            setEditHeaderDaysAvailable(datesHeader.daysAvailable);
            setEditHeaderTimes(datesHeader.times);
            setEditOrgName(datesHeader.orgName);
            setEditLocation(datesHeader.location);
            setEditFee(datesHeader.fee);
            setEditHeaderColour(datesHeader.colour)

            setEditFooterDay(datesFooter.day);
            setEditFooterMonth(datesFooter.month);
            setEditFooterDaysAvailable(datesFooter.daysAvailable);
            setEditFooterTimes(datesFooter.times);
            setEditFooterColour(datesFooter.colour);
        }
    }, [datesHeader, datesFooter]);

    const onSubmit = async (e) =>{
        console.log('VERSION: 1.15');
        console.log('clicked submit');
        e.preventDefault();
        setSubmit(true);

        const updatedData = {
            loginData: {
                username: username,
                password: password,
            },
            headerData: {
                header : true,
                body: false,
                footer: false,
                title: editTitle,
                subtitle: editSubtitle,
                description: editDescription,
                day: editHeaderDay,
                month: editHeaderMonth,
                daysAvailable: editHeaderDaysAvailable,
                times: editHeaderTimes,
                orgName: editOrgName,
                location: editLocation,
                fee: editFee,
                colour: editHeaderColour
            },

            footerData: {
                header: false,
                body: false,
                footer: true,
                title: editTitle,
                subtitle: editSubtitle,
                description: editDescription,
                day: editFooterDay,
                month: editFooterMonth,
                daysAvailable: editFooterDaysAvailable,
                times: editFooterTimes,
                orgName: editOrgName,
                location: editLocation,
                fee: editFee,
                colour: editFooterColour
            }
        }

        try{
            console.log(updatedData);
            //If there's no data, throw error
            if(!updatedData) throw new Error('Issue with the dataSet to be uploaded');
            const response = await api.put('/put', updatedData, {headers: {
                'Content-Type': 'application/json'
              }});   
            console.log(response);   
            setDatesHeader(response.data[0]);
            setDatesFooter(response.data[1]);
            console.log('Dates data recieved');
        }catch(err){
            if(err.response){
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
            }else{
              console.log(`Error: ${err.message}`);
            }
            //console.log(err);
            alert("connection to the back-end server couldn't be secured, please try-again");
        }
    }

    return(
        <div className="adminPage">
            <h1>Admin Panel</h1>
            <Link to={'/'}>Take me home</Link>
            <form className="adminForm" onSubmit={onSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <td><label className="hide" htmlFor="username">Username</label><input value={username} onChange={(e) => setUsername(e.target.value)} id="username" type="text"></input></td>
                        </tr>
                        <tr className="rowLine">
                            <th>Password</th>
                            <td><label className="hide" htmlFor="password">Password</label><input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password"></input></td>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <td><label className="hide" htmlFor="title">Title</label><input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} id="title" type="text"></input></td>
                        </tr>
                        <tr>
                            <th>Subtitle</th>
                            <td><label className="hide" htmlFor="subtitle">Subtitle</label><input value={editSubtitle} onChange={(e) => setEditSubtitle(e.target.value)} id="subtitle" type="text"></input></td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td><label className="hide" htmlFor="description">Description</label><textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} id="description" type="text"></textarea></td>
                        </tr>
                        <tr>
                            <th>Org Name</th>
                            <td><label className="hide" htmlFor="orgName">Org Name</label><input value={editOrgName} onChange={(e) => setEditOrgName(e.target.value)} id="orgName" type="text"></input></td>
                        </tr>
                        <tr>
                            <th>Location</th>
                            <td><label className="hide" htmlFor="location">Location</label><input value={editLocation} onChange={(e) => setEditLocation(e.target.value)} id="location" type="text"></input></td>
                        </tr>
                        <tr>
                            <th>Fee</th>
                            <td><label className="hide" htmlFor="fee">Fee</label><input value={editFee} onChange={(e) => setEditFee(e.target.value)} id="fee" type="number"></input></td>
                        </tr>
                    </tbody>
                </table>

                <table className="headerFooterTable">
                    <thead>
                        <tr>
                            <th>Settings</th>
                            <th>Header</th>
                            <th>Footer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Day</th>
                            <td><label className="hide" htmlFor="headerDay">Header Day</label>< input value={editHeaderDay} onChange={(e) => setEditHeaderDay(e.target.value)} id="headerDay" type="text"></input></td>
                            <td><label className="hide" htmlFor="footerDay">Footer Day</label><input value={editFooterDay} onChange={(e) => setEditFooterDay(e.target.value)} id="footerDay" type="text"></input></td>
                        </tr>
                        <tr>
                            <th>Month</th>
                            <td><label className="hide" htmlFor="headerMonth">Header Month</label><input value={editHeaderMonth} onChange={(e) => setEditHeaderMonth(e.target.value)} id="headerMonth" type="text"></input></td>
                            <td><label className="hide" htmlFor="footerMonth">Footer Month</label><input value={editFooterMonth} onChange={(e) => setEditFooterMonth(e.target.value)} id="footerMonth" type="text"></input></td>
                        </tr>
                        <tr>
                            <th>Availability</th>
                            <td><label className="hide" htmlFor="headerDaysAvailable">Header Days Available</label><input value={editHeaderDaysAvailable} onChange={(e) => setEditHeaderDaysAvailable(e.target.value)} id="headerDaysAvailable" type="text"></input></td>
                            <td><label className="hide" htmlFor="footerDaysAvailable">Footer Days Available</label><input value={editFooterDaysAvailable} onChange={(e) => setEditFooterDaysAvailable(e.target.value)} id="footerDaysAvailable" type="text"></input></td>
                        </tr>
                        <tr>
                            <th>Times</th>
                            <td><label className="hide" htmlFor="headerTimes">Header Times</label><input value={editHeaderTimes} onChange={(e) => setEditHeaderTimes(e.target.value)} id="headerTimes" type="text"></input></td>
                            <td><label className="hide" htmlFor="footerTimes">Footer Times</label><input value={editFooterTimes} onChange={(e) => setEditFooterTimes(e.target.value)} id="footerTimes" type="text"></input></td>
                        </tr>
                        <tr>
                            <th>Colour</th>
                            <td><label className="hide" htmlFor="headerColour">Header Colour</label><input value={editHeaderColour} onChange={(e) => setEditHeaderColour(e.target.value)} id="headerColour" type="color"></input></td>
                            <td><label className="hide" htmlFor="footerTimes">Footer Colour</label><input value={editFooterColour} onChange={(e) => setEditFooterColour(e.target.value)} id="footerColour" type="color"></input></td>
                        </tr>
                    </tbody>
                </table>

                <button className="adminBtn" type="submit">{(submit) ? <BsArrowDownSquareFill /> : <BsArrowDownSquare />}</button>
            </form>
        </div>
    );
}

export default Admin;