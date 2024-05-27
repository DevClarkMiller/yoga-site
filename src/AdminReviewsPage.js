import { useContext } from "react";
import { AdminReviewsContext } from "./Admin";
import TableFormData from "./TableFormData";
import { Oval } from "react-loading-icons";
import { BsArrowUpSquare, BsArrowUpSquareFill } from "react-icons/bs";

const AdminReviewsPage = () => {
    const {onNewUrlSubmit, editLogin, setEditLogin, loading, submit, editNewReview, setEditNewReview} = useContext(AdminReviewsContext)

    return(
        <form className="adminForm" onSubmit={onNewUrlSubmit}>
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