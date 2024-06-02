import { AdminDatesContext } from "../Admin";
import AdminTable from "../AdminTable";
import { BsArrowUpSquare, BsArrowUpSquareFill } from "react-icons/bs";
import { Oval } from "react-loading-icons";
import TableFormData from "../TableFormData";
import TableFormDataTArea from "../TableFormDataTArea";
import { useContext } from "react";

const AdminDatesPage = () =>{
    
    const {onSubmit, editLogin, setEditLogin, editGeneral, setEditGeneral, editHeader, setEditHeader, editFooter, setEditFooter, loading, submit} = useContext(AdminDatesContext);
    return(
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
                (loading) ? <Oval /> : (submit) ? <BsArrowUpSquareFill /> : <BsArrowUpSquare />}
            </button>                
        </form>
    );
}

export default AdminDatesPage;