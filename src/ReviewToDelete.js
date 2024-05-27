import { useContext } from "react";
import { AdminReviewsDeleteContext } from "./Admin";
import { FaRegTrashCan } from "react-icons/fa6";

const ReviewToDelete = ({review}) =>{
    const {deletedReviews, setDeletedReviews} = useContext(AdminReviewsDeleteContext);

    const addDeletedReview = () =>{
        let tempReviews = [...deletedReviews];
        tempReviews.push(review);
        setDeletedReviews(tempReviews);
        console.log(tempReviews);
    }
    return(
        <div className="reviewToDelete">
            <h2>{review.sender}</h2>
            <p>{review.message}</p>
            <button type="button" onClick={addDeletedReview}><FaRegTrashCan/></button>
        </div>
    )
}

export default ReviewToDelete;