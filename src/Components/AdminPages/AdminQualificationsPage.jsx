import { useContext, useEffect, useState } from "react";

// Components
import TableFormData from "../TableFormData";
import Oval from "react-loading-icons/dist/esm/components/oval";


// Icons
import { MdDeleteOutline } from "react-icons/md";
import { IoEnterOutline } from "react-icons/io5";
import { BsArrowUpSquare, BsArrowUpSquareFill } from "react-icons/bs";

// Context
import { AdminQualificationsContext } from "../Admin";

const AdminQualificationsPage = () =>{
    const {loading, submit, qualifications, setQualifications, editLogin, setEditLogin, onSubmitQualifications} = useContext(AdminQualificationsContext);

    const [editNewQual, setEditNewQual] = useState("");

    const addQualification = () =>{
        const tempQualifications = [...qualifications];
        tempQualifications.push({text: editNewQual});
        setQualifications(tempQualifications);
        setEditNewQual("");
    }

    const removeQualification = (id) =>{
        const tempQualifications = [...qualifications];
        tempQualifications.splice(id);
        setQualifications(tempQualifications)
    }

    return(
        <form className="adminForm" onSubmit={onSubmitQualifications}>
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

            <span className="labelNInput">
            <label htmlFor="newQualification">Add Qualification</label>
            <input value={editNewQual} onChange={(e) => setEditNewQual(e.target.value)} id="newQualification" type="text"></input>
            <IoEnterOutline onClick={addQualification} className="enterBtn"/>
            </span>
            
            {
                qualifications &&
                <ul>
                    {
                        qualifications.map((qualification) =>(
                            <li className="qualNDelete" key={qualifications.indexOf(qualification)}>{qualification.text}<MdDeleteOutline onClick={() => removeQualification(qualifications.indexOf(qualification))} className="deleteBtn"/></li>
                        ))
                    }
                </ul>
            }
            <button className="adminBtn" type="submit">{
                (loading) ? <Oval /> : (submit) ? <BsArrowUpSquareFill /> : <BsArrowUpSquare />}
            </button>    
        </form>
    );
}

export default AdminQualificationsPage;