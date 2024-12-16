import { useState } from "react";

// Components
import RoundedList from "../Utilities/RoundedList";

// Icons
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const AdminReview = ({ onCreateReview, onDeleteReview, reviews}) => {
    const [editReview, setEditReview] = useState("");

    return (
        <div className="w-full h-fit flex-grow col-flex-center justify-center">
            {!reviews ? <h2>{`No reveiws found!`}</h2> : 
            <>
                <RoundedList title={`Modify Reviews`}>
                    <li className="list-btn font-bold flex justify-between w-full items-center">
                        <input className="text-gray-500 p-2 text-lg" value={editReview} onChange={e => setEditReview(e.target.value)} placeholder="Review Facebook URL" />
                        <button onClick={() => onCreateReview(editReview)}><IoMdAddCircle /></button>
                    </li>
                    {reviews&& reviews.map(review =>
                    <li className="list-btn font-bold flex justify-between w-full items-center">
                    <div className="font-medium" value={editReview} ><span className="text-blue-500 font-semibold">{review.sender}</span>: {review.message}</div>
                    <button onClick={() => onDeleteReview(review)}><MdOutlineDeleteOutline /></button>  
                </li>
                    )}
                </RoundedList>
            </>    
            }
        </div>
    );
}

export default AdminReview;