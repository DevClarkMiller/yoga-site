import { useContext } from "react";

// Components
import { Oval } from "react-loading-icons";
import TableFormData from "../TableFormData";
import TableFormDataTArea from "../TableFormDataTArea";

// Icons
import { BsArrowUpSquare, BsArrowUpSquareFill } from "react-icons/bs";

// Context
import { AdminContentContext } from "../Admin";

const AdminContentPage = () =>{
    const {onContentSubmit, editLogin, setEditLogin, editContentP1, setEditContentP1, editContentP2, setEditContentP2, editContentP3, setEditContentP3, loading, submit} = useContext(AdminContentContext);
    return(
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
                        <td><select id="p1Layout" onChange={(e) => setEditContentP1({...editContentP1, layout: parseInt(e.target.value)})} value={editContentP1.layout ?? 0}>
                            <option value={0}>Layout 1</option>
                            <option value={1}>Layout 2</option>
                        </select></td>
                        <td><select id="p2Layout" onChange={(e) => setEditContentP2({...editContentP2, layout: parseInt(e.target.value)})} value={editContentP2.layout ?? 1}>
                            <option value={0}>Layout 1</option>
                            <option value={1}>Layout 2</option>
                        </select></td>
                        <td><select id="p3Layout" onChange={(e) => setEditContentP3({...editContentP3, layout: parseInt(e.target.value)})} value={editContentP3.layout ?? 1}>
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
            (loading) ? <Oval /> : (submit) ? <BsArrowUpSquareFill /> : <BsArrowUpSquare />}
            </button> 
        </form>
    );
}

export default AdminContentPage;