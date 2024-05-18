import { useEffect, useState, useContext } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { BsArrowDownSquare, BsArrowDownSquareFill } from "react-icons/bs";
import api from './ConfigFiles/api'
import {Oval } from 'react-loading-icons'
import { RefContext } from './App'
import TableFormData from "./TableFormData";
import TableFormDataTArea from "./TableFormDataTArea";
import AdminTable from "./AdminTable";
import NotFound from "./NotFound";

const Admin = () =>{
    const navigate = useNavigate();

    const context = useContext(RefContext);
    const {appRef, setIsAdmin, setDatesConfigAll, datesConfigAll, setContentConfig, contentConfig } = context;

    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const [editContent, setEditContent] = useState();


    //Will only do this if the datesHeader and datesFooter objects are loaded
    useEffect(()=>{
        setIsAdmin(true);        
        if(datesConfigAll){
            //Sets all the initial values for the input fields
            setEditTitle(datesConfigAll.general.title);
            setEditSubtitle(datesConfigAll.general.subtitle);
            setEditDescription(datesConfigAll.general.description);
            setEditOrgName(datesConfigAll.general.orgName);
            setEditLocation(datesConfigAll.general.location);
            setEditFee(datesConfigAll.general.fee);

            setEditHeaderDay(datesConfigAll.header.day);
            setEditHeaderMonth(datesConfigAll.header.month);
            setEditHeaderDaysAvailable(datesConfigAll.header.daysAvailable);
            setEditHeaderTimes(datesConfigAll.header.times);
            setEditHeaderColour(datesConfigAll.header.colour)

            setEditFooterDay(datesConfigAll.footer.day);
            setEditFooterMonth(datesConfigAll.footer.month);
            setEditFooterDaysAvailable(datesConfigAll.footer.daysAvailable);
            setEditFooterTimes(datesConfigAll.footer.times);
            setEditFooterColour(datesConfigAll.footer.colour);
        }

        if(appRef.current){
            appRef.current.classList.add('centerContent');
            appRef.current.classList.add('fullHeight');
        }
    }, []);

    const onSubmit = async (e) =>{
        setLoading(true);
        console.log('VERSION: 1.16');
        e.preventDefault();

        const updatedData = {
            loginData: {
                username: username,
                password: password,
            },
            general: {
                title: editTitle,
                subtitle: editSubtitle,
                description: editDescription,
                orgName: editOrgName,
                location: editLocation,
                fee: editFee
            },
            header: {
                day: editHeaderDay,
                month: editHeaderMonth,
                daysAvailable: editHeaderDaysAvailable,
                times: editHeaderTimes,
                colour: editHeaderColour
            },

            footer: {
                day: editFooterDay,
                month: editFooterMonth,
                daysAvailable: editFooterDaysAvailable,
                times: editFooterTimes,
                colour: editFooterColour
            }
        }

        try{
            console.log(updatedData);
            //If there's no data, throw error
            if(!updatedData) throw new Error('Issue with the dataSet to be uploaded');
            const response = await api.put('/put/all', updatedData, {headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }});   
            const data = response.data;

            //console.log(response);   
            setDatesConfigAll({
                general: data.general,
                header: data.header,
                footer: data.footer
            });
            console.log('Dates data recieved');
            setLoading(false);
            setSubmit(true);
            //Delays un-filling the downloading button
            setTimeout(()=>{
                setSubmit(false);
            }, 1000);
            
        }catch(err){
            if(err.response){
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
              alert(`Error: ${err.response.data.error}`);
            }else{
              console.log(`Error: ${err.message}`);
            }  
        }
    }

    return(
        <div className="adminPage">
            <h1>Admin Panel</h1>
            <Link to={'/'}>Take me home</Link>
            
            <Routes>
                <Route path="/" element={<div></div>} />
                <Route path="/dates" element={
                    <form className="adminForm" onSubmit={onSubmit} >
                        <AdminTable tableRows=
                        {[
                            {isTArea: false, th: "Username", _type: "text", id: "username", val:username, change: setUsername, labelTxt: "Username"},
                            {isTArea: false, th: "Password", _type: "password", id: "password", val:password, change: setPassword, labelTxt: "Password"},
                            {isTArea: false, th:"Title", _type: "text", id: "title", val:editTitle, change: setEditTitle, labelTxt: "Title"},
                            {isTArea: false, th: "subtitle", _type: "text", id: "subtitle", val:editSubtitle, change: setEditSubtitle, labelTxt:"Subtitle"},
                            {isTArea: true, th: "Description", _type: "text", id: "description", val:editDescription, change: setEditDescription, labelTxt:"Description"},
                            {isTArea: false, th: "Org Name", _type: "text", id: "orgName", val:editOrgName, change: setEditOrgName, labelTxt: "Org"},
                            {isTArea: false, th: "Location", _type: "text", id: "location", val:editLocation, change: setEditLocation, labelTxt: "Location"},
                            {isTArea: false, th: "Fee", _type: "text", id: "fee", val:editFee, change: setEditFee, labelTxt: "Fee"},
                        ]} />

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
                        <button className="adminBtn" type="submit">{
                            (loading) ? <Oval /> : (submit) ? <BsArrowDownSquareFill /> : <BsArrowDownSquare />}
                        </button>                
                    </form>
                }/>

                <Route path="/content" element={ 
                     <form className="adminForm"> 
                        <AdminTable tableRows=
                            {[
                                {isTArea: false, th: "Username", _type: "text", id: "username", val:username, change: setUsername, labelTxt: "Username"},
                                {isTArea: false, th: "Password", _type: "password", id: "password", val:password, change: setPassword, labelTxt: "Password"},
                                {isTArea: false, th:"Title", _type: "text", id: "title", val:editTitle, change: setEditTitle, labelTxt: "Title"},
                                {isTArea: false, th: "subtitle", _type: "text", id: "subtitle", val:editSubtitle, change: setEditSubtitle, labelTxt:"Subtitle"},
                                {isTArea: true, th: "Description", _type: "text", id: "description", val:editDescription, change: setEditDescription, labelTxt:"Description"},
                                {isTArea: false, th: "Org Name", _type: "text", id: "orgName", val:editOrgName, change: setEditOrgName, labelTxt: "Org"},
                                {isTArea: false, th: "Location", _type: "text", id: "location", val:editLocation, change: setEditLocation, labelTxt: "Location"},
                                {isTArea: false, th: "Fee", _type: "text", id: "fee", val:editFee, change: setEditFee, labelTxt: "Fee"},
                            ]} />
                        <button className="adminBtn" type="submit">{
                        (loading) ? <Oval /> : (submit) ? <BsArrowDownSquareFill /> : <BsArrowDownSquare />}
                        </button> 
                    </form>} />

                <Route path='*' element={<NotFound />}/>

            </Routes>
            <div className="buttonsNav">
                <button onClick={() => navigate('/admin/dates')} className="sendButton">1</button>
                <button onClick={() => navigate('/admin/content')} className="sendButton">2</button>
            </div>
        </div>
        
    );
}

export default Admin;