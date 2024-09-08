import { useContext } from "react";

// Icons
import { FaRegTrashCan } from "react-icons/fa6";

// Context
import { AdminReviewsDeleteContext } from "./Admin";

const ReviewToDelete = ({review}) =>{
    const {reviews, setReviews} = useContext(AdminReviewsDeleteContext);

    const deleteReview = () =>{
        const tempReviews = [...reviews];
        tempReviews.splice(tempReviews.indexOf(review), 1);
        setReviews(tempReviews);
    }
    return(
        <div className="reviewToDelete">
            <h2>{review.sender}</h2>
            <p>{review.message}</p>
            <button type="button" onClick={deleteReview}><FaRegTrashCan/></button>
        </div>
    )
}

export default ReviewToDelete;