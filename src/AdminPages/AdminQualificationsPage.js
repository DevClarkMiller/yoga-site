import Oval from "react-loading-icons/dist/esm/components/oval";
import { BsArrowUpSquare, BsArrowUpSquareFill } from "react-icons/bs";
import { AdminQualificationsContext } from "../Admin";
import { useContext } from "react";
import TableFormData from "../TableFormData";

const AdminQualificationsPage = () =>{
    const {loading, submit, qualifications, setQualifications, editLogin, setEditLogin} = useContext(AdminQualificationsContext);
    return(
        <form className="adminForm">

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
            <input id="newQualification" type="text"></input>
            </span>
            
            {
                qualifications &&
                <ul>
                    {
                        qualifications.map((qualification) =>{
                            <li key={qualifications.indexOf(qualification)}>asd</li>
                        })
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