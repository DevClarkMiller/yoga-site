import { useEffect, useState, useContext } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { BsArrowDownSquare, BsArrowDownSquareFill } from "react-icons/bs";
import api from './ConfigFiles/api'
import {Oval } from 'react-loading-icons'
import { RefContext } from './App'
import AdminTable from "./AdminTable";
import NotFound from "./NotFound";
import TableFormData from "./TableFormData";
import TableFormDataTArea from "./TableFormDataTArea";
import useFetchPut from "./useFetchPut";

const Admin = () =>{
    const navigate = useNavigate();

    const context = useContext(RefContext);
    const { appRef, setIsAdmin, setDatesConfigAll, datesConfigAll, setContentConfig, contentConfig } = context;

    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);

    const [editLogin, setEditLogin] = useState({username: "", password: ""});
    const [editGeneral, setEditGeneral] = useState(datesConfigAll.general);
    const [editHeader, setEditHeader] = useState(datesConfigAll.header);
    const [editFooter, setEditFooter] = useState(datesConfigAll.footer);

    const [editContentP1, setEditContentP1] = useState(contentConfig.firstPanel);
    const [editContentP2, setEditContentP2] = useState(contentConfig.secondPanel);
    const [editContentP3, setEditContentP3] = useState(contentConfig.thirdPanel);

    const { putData, putLoading, putError } = useFetchPut(null);

    useEffect(()=>{
        setIsAdmin(true);        

        if(appRef.current){
            appRef.current.classList.add('centerContent');
            appRef.current.classList.add('fullHeight');
        }
        console.log(datesConfigAll);
    }, []);

    /*
    const putData = async (path, data) =>{
        try{
            //If there's no data, throw error
            if(!data) throw new Error('Issue with the dataSet to be uploaded');
            const response = await api.put(`/put${path}`, data, {headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }});   
            return response.data;      
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
    }*/

    const onSubmit = async (e) =>{
        setLoading(true);
        console.log('VERSION: 1.16');
        e.preventDefault();

        const updatedData = {
            loginData: {
                username: editLogin.username,
                password: editLogin.password,
            },
            general: {
                title: editGeneral.title,
                subtitle: editGeneral.subtitle,
                description: editGeneral.description,
                orgName: editGeneral.orgName,
                location: editGeneral.location,
                fee: editGeneral.fee
            },
            header: {
                day: editHeader.day,
                month: editHeader.month,
                daysAvailable: editHeader.daysAvailable,
                times: editHeader.times,
                colour: editHeader.colour
            },

            footer: {
                day: editFooter.day,
                month: editFooter.month,
                daysAvailable: editFooter.daysAvailable,
                times: editFooter.times,
                colour: editFooter.colour
            }
        }

        const data = putData('/all', updatedData);
        useEffect( ()=>{
            if(!loading){
                console.log(data);
              if(!error){
                setDatesConfigAll({
                  general: data.general,
                  header: data.header,
                  footer: data.footer
                });
        
                setContentConfig(data.content);
              }
            }
          }, [data]);

          
        if(data){
            setDatesConfigAll({
                general: data.general,
                header: data.header,
                footer: data.footer
            });
            console.log('Dates data recieved');
            setLoading(false);
            setSubmit(true);
            setTimeout(()=>{
                setSubmit(false);
            }, 1000);
        }
    }

    const onContentSubmit = async (e) =>{
        setLoading(true);
        e.preventDefault();

        const updatedData = {
            loginData: {
                username: editLogin.username,
                password: editLogin.password,
            },
            firstPanel: editContentP1,
            secondPanel: editContentP2,
            thirdPanel: editContentP3
        }

        console.log(updatedData);

        const data = putData('/content', updatedData);
        if(data){
            setContentConfig(data);
            console.log('Dates data recieved');
            setLoading(false);
            setSubmit(true);
            //Delays un-filling the downloading button
            setTimeout(()=>{
                setSubmit(false);
            }, 1000);
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
                            {isTArea: false, th: "Username", _type: "text", id: "username", val:editLogin.username, change: (e) => setEditLogin({...editLogin, username: e.target.value}), labelTxt: "Username"},
                            {isTArea: false, th: "Password", _type: "password", id: "password", val:editLogin.password, change: (e) => setEditLogin({...editLogin, password: e.target.value}), labelTxt: "Password"},
                            {isTArea: false, th:"Title", _type: "text", id: "title", val:editGeneral.title, change: (e) => setEditGeneral({...editGeneral, title: e.target.value}), labelTxt: "Title"},
                            {isTArea: false, th: "subtitle", _type: "text", id: "subtitle", val:editGeneral.subtitle, change: (e) => setEditGeneral({...editGeneral, subtitle: e.target.value}), labelTxt:"Subtitle"},
                            {isTArea: true, th: "Description", _type: "text", id: "description", val:editGeneral.description, change: (e) => setEditGeneral({...editGeneral, description: e.target.value}), labelTxt:"Description"},
                            {isTArea: false, th: "Org Name", _type: "text", id: "orgName", val:editGeneral.orgName, change: (e) => setEditGeneral({...editGeneral, orgName: e.target.value}), labelTxt: "Org"},
                            {isTArea: false, th: "Location", _type: "text", id: "location", val:editGeneral.location, change: (e) => setEditGeneral({...editGeneral, location: e.target.value}), labelTxt: "Location"},
                            {isTArea: false, th: "Fee", _type: "text", id: "fee", val:editGeneral.fee, change: (e) => setEditGeneral({...editGeneral, fee: e.target.value}), labelTxt: "Fee"}, 
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
                                    <TableFormData _type={"text"} id={"headerDay"} val={editHeader.day} change={(e) => setEditHeader({...editHeader, day: e.target.value})} labelTxt={"Header Day"}/>
                                    <TableFormData _type={"text"} id={"footerDay"} val={editFooter.day} change={(e) => setEditFooter({...editFooter, day: e.target.value})} labelTxt={"Footer Day"}/>
                                </tr>
                                <tr>
                                    <th>Month</th>
                                    <TableFormData _type={"text"} id={"headerMonth"} val={editHeader.month} change={(e) => setEditHeader({...editHeader, month: e.target.value})} labelTxt={"Header Month"}/>
                                    <TableFormData _type={"text"} id={"footerMonth"} val={editFooter.month} change={(e) => setEditFooter({...editFooter, month: e.target.value})} labelTxt={"Footer Month"}/>
                                </tr>
                                <tr>
                                    <th>Availability</th>
                                    <TableFormData _type={"text"} id={"headerDaysAvailable"} val={editHeader.daysAvailable} change={(e) => setEditHeader({...editHeader, daysAvailable: e.target.value})} labelTxt={"Header Days Available"}/>
                                    <TableFormData _type={"text"} id={"footerDaysAvailable"} val={editFooter.daysAvailable} change={(e) => setEditFooter({...editFooter, daysAvailable: e.target.value})} labelTxt={"Footer Days Available"}/>
                                </tr>
                                <tr>
                                    <th>Times</th>
                                    <TableFormData _type={"text"} id={"headerTimes"} val={editHeader.times} change={(e) => setEditHeader({...editHeader, times: e.target.value})} labelTxt={"Header Times"}/>
                                    <TableFormData _type={"text"} id={"footerTimes"} val={editFooter.times} change={(e) => setEditFooter({...editFooter, times: e.target.value})} labelTxt={"Footer Times"}/>
                                </tr>
                                <tr>
                                    <th>Colour</th>
                                    <TableFormData _type={"color"} id={"headerColour"} val={editHeader.colour} change={(e) => setEditHeader({...editHeader, colour: e.target.value})} labelTxt={"Header Colour"}/>
                                    <TableFormData _type={"color"} id={"footerColour"} val={editFooter.colour} change={(e) => setEditFooter({...editFooter, colour: e.target.value})} labelTxt={"Footer Colour"}/>
                                </tr>
                            </tbody>
                        </table>
                        <button className="adminBtn" type="submit">{
                            (loading) ? <Oval /> : (submit) ? <BsArrowDownSquareFill /> : <BsArrowDownSquare />}
                        </button>                
                    </form>
                }/>

                <Route path="/content" element={ 
                     <form className="adminForm" onSubmit={onContentSubmit}> 
                        <table>
                            <tbody>
                                <tr>
                                    <th>Username</th>
                                    <TableFormData _type={"text"} id={"username2"} val={editLogin.username} change={(e) => setEditLogin({...editLogin, username: e.target.value})} labelTxt={"Username"}/>
                                </tr>
                                <tr>
                                    <th>Password</th>
                                    <TableFormData _type={"password"} id={"password2"} val={editLogin.password} change={(e) => setEditLogin({...editLogin, password: e.target.value})} labelTxt={"Password"}/>
                                </tr> 
                            </tbody>
                        </table>

                        <table className="headerFooterTable">
                            <thead>
                                <tr>
                                    <th>Options</th>
                                    <th>Panel 1</th>
                                    <th>Panel 2</th>
                                    <th>Panel 3</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Layout</th>
                                    <td><select id="p1Layout" onChange={(e) => setEditContentP1({...editContentP1, layout: e.target.value})} value={editContentP1.layout ?? 0}>
                                        <option value={0}>Layout 1</option>
                                        <option value={1}>Layout 2</option>
                                    </select></td>
                                    <td><select id="p2Layout" onChange={(e) => setEditContentP2({...editContentP2, layout: e.target.value})} value={editContentP2.layout ?? 1}>
                                        <option value={0}>Layout 1</option>
                                        <option value={1}>Layout 2</option>
                                    </select></td>
                                    <td><select id="p3Layout" onChange={(e) => setEditContentP3({...editContentP3, layout: e.target.value})} value={editContentP3.layout ?? 1}>
                                        <option value={0}>Layout 1</option>
                                        <option value={1}>Layout 2</option>
                                    </select></td>
                                    
                                </tr>
                                <tr>
                                    <th>Title</th>
                                    <TableFormData _type={"text"} id={"p1Header"} val={editContentP1.header} change={(e) => setEditContentP1({...editContentP1, header: e.target.value})} labelTxt={"Panel 1 Header"}/>                                    
                                    <TableFormData _type={"text"} id={"p2Header"} val={editContentP2.header} change={(e) => setEditContentP2({...editContentP2, header: e.target.value})} labelTxt={"Panel 2 Header"}/>                                    
                                    <TableFormData _type={"text"} id={"p3Header"} val={editContentP3.header} change={(e) => setEditContentP3({...editContentP3, header: e.target.value})} labelTxt={"Panel 3 Header"}/>                                    
                                </tr>
                                <tr>
                                    <th>Paragraph</th>
                                    <TableFormDataTArea _type={"text"} id={"p1Paragraph"} val={editContentP1.text} change={(e) => setEditContentP1({...editContentP1, text: e.target.value})} labelTxt={"Panel 1 Paragraph"}/>                                    
                                    <TableFormDataTArea _type={"text"} id={"p2Paragraph"} val={editContentP2.text} change={(e) => setEditContentP2({...editContentP2, text: e.target.value})} labelTxt={"Panel 2 Paragraph"}/>                                    
                                    <TableFormDataTArea _type={"text"} id={"p3Paragraph"} val={editContentP3.text} change={(e) => setEditContentP3({...editContentP3, text: e.target.value})} labelTxt={"Panel 3 Paragraph"}/> 
                                </tr>
                                <tr>
                                    <th>Colour</th>
                                    <TableFormData _type={"color"} id={"p1Colour"} val={editContentP1.colour} change={(e) => setEditContentP1({...editContentP1, colour: e.target.value})} labelTxt={"Panel 1 Colour"}/>                                    
                                    <TableFormData _type={"color"} id={"p2Colour"} val={editContentP2.colour} change={(e) => setEditContentP2({...editContentP2, colour: e.target.value})} labelTxt={"Panel 2 Colour"}/>                                    
                                    <TableFormData _type={"color"} id={"p3Colour"} val={editContentP3.colour} change={(e) => setEditContentP3({...editContentP3, colour: e.target.value})} labelTxt={"Panel 3 Colour"}/>                                    
                                </tr>
                            </tbody>
                        </table>
                        {/*Changes to a loading button if the request is taking a long time, then switches to a full icon then back to normal*/}
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