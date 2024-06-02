import Oval from "react-loading-icons/dist/esm/components/oval";
import { BsArrowUpSquare, BsArrowUpSquareFill } from "react-icons/bs";
import { AdminQualificationsContext } from "../Admin";
import { useContext } from "react";

const AdminQualificationsPage = () =>{
    const {loading, submit} = useContext(AdminQualificationsContext);
    return(
        <form className="adminForm">
            <ul>
                
            </ul>



            <button className="adminBtn" type="submit">{
                (loading) ? <Oval /> : (submit) ? <BsArrowUpSquareFill /> : <BsArrowUpSquare />}
            </button>    
        </form>
    );
}

export default AdminQualificationsPage;