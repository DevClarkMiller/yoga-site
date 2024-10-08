import { useContext, useEffect } from "react";

// Components
import { Oval } from "react-loading-icons";
import ReviewToDelete from '../Reviews/ReviewToDelete';
import TableFormData from "../TableFormData";

// Icons
import { BsArrowUpSquare, BsArrowUpSquareFill } from "react-icons/bs";

// Context
import { AdminReviewsDeleteContext } from "../Admin";

const AdminDeleteReviewsPage = () =>{
    const {reviews, setReviews, editLogin, setEditLogin, loading, submit, onSubmitDeleteReviews} = useContext(AdminReviewsDeleteContext)


    return (
        <form className="adminForm" onSubmit={onSubmitDeleteReviews}>
            <table>
                <tbody>
                    <tr>
                        <th>Username</th>
                        <TableFormData _type={"text"} id={"username"} val={editLogin.username} change={(e) => setEditLogin({...editLogin, username: e.target.value})} labelTxt={"Username"}/>
                    </tr>
                    <tr>
                        <th>Password</th>
                        <TableFormData _type={"password"} id={"password"} val={editLogin.password} change={(e) => setEditLogin({...editLogin, password: e.target.value})} labelTxt={"Password"}/>
                    </tr> 
                   
                </tbody>
            </table>
   
            <div className="deletableReviews">
                {
                    reviews && reviews.map((review) =>(
                        <ReviewToDelete key={review.id} review={review} />
                    ))
                } 
            </div>
        

            <button className="adminBtn" type="submit">{
            (loading) ? <Oval /> : (submit) ? <BsArrowUpSquareFill /> : <BsArrowUpSquare />}
            </button> 
        </form>
    );
}

export default AdminDeleteReviewsPage;