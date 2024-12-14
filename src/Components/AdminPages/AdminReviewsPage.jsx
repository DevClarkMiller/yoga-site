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
            <table className="!w-3/4">
                <tbody>
                    <tr>
                        <th>New Review URL</th>
                        <TableFormData _type="text" id={"newReview"} val={editNewReview} change={(e) => setEditNewReview(e.target.value)} labelTxt={"New Review"}/>
                    </tr>
                </tbody>
            </table>
            <button className="adminBtn" type="submit">{
            (loading) ? <Oval /> : (submit) ? <BsArrowUpSquareFill /> : <BsArrowUpSquare />}
            </button> 
        </form>
    );
}

export default AdminReviewsPage;