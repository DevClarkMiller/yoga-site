import { useContext, useEffect, useState } from "react";

// Components
import ReviewItem from '../Reviews/ReviewItem';

// Context 
import { RefContext } from "../../App";

const ReviewsPanel = () =>{
    const [randomReviews, setRandomReviews] = useState([]);
    const { reviews } = useContext(RefContext);

    useEffect(() =>{
        if(reviews){
            let tempReviews = [];

            for(let i = 0; i < reviews.length; i++){
                if(i < 3){
                    const randomReview = reviews[Math.floor(Math.random() * reviews.length)];
                    //Checks if review has already been randomly pulled
                    if(tempReviews.find((review) => review === randomReview)){
                        //If it has, the loop will iterate backwards
                        i--;
                    }else{
                        //If it doesn't, it will just push the review to the randomReviews array
                        tempReviews.push(randomReview);
                    }
                }else{
                    break;
                }
            }
            setRandomReviews(tempReviews);
        }
    }, [reviews]);

    return(
        <>
            {
                randomReviews && 
                <div className="reviewsPanel">
                    <h2 className="reviewsHeader">⭐⭐⭐ Top Reviews ⭐⭐⭐</h2>
                    {randomReviews.map((review) =>(
                    <ReviewItem key={randomReviews.indexOf(review)} review={review} />
                    ))}
                </div>
            }
        </>
        
    );
}

export default ReviewsPanel;