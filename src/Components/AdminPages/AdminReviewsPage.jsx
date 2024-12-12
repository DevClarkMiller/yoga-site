import { useContext } from "react";

// Components
import TableFormData from "../TableFormData";

// Icons
import { Oval } from "react-loading-icons";
import { BsArrowUpSquare, BsArrowUpSquareFill } from "react-icons/bs";

// Context 
import { AdminReviewsContext } from "../Admin";

const AdminReviewsPage = () => {
    const {onNewUrlSubmit, editLogin, setEditLogin, loading, submit, editNewReview, setEditNewReview} = useContext(AdminReviewsContext)

    return(
        <form className="adminForm" onSubmit={onNewUrlSubmit}>
            <button className="adminBtn" type="submit">{
            (loading) ? <Oval /> : (submit) ? <BsArrowUpSquareFill /> : <BsArrowUpSquare />}
            </button> 
        </form>
    );
}

export default AdminReviewsPage;