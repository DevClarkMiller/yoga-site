const ReviewItem = ({review}) =>{
    return(
        <div className="reviewItem">
                <h2>{review.sender}</h2>
                <p>{review.message}</p>
        </div>
    )
}

export default ReviewItem;