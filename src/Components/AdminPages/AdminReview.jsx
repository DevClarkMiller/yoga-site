import { useState } from "react";

// Components
import LinkWithIcon from "../Utilities/LinkWithIcon";
import RoundedList from "../Utilities/RoundedList";

// Icons
import { MdEdit } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const AdminPage = ({ onCreateReview, onDeleteReview }) => {

    return (
        <div className="w-full h-fit flex-grow col-flex-center justify-center">
            {!content ? <h2>{`No ${pageType} found!`}</h2> : 
            <>
                <RoundedList title={`Modify ${pageType}`}>
                    {extraRows&& extraRows}
                    {canAdd&&<li className="list-btn font-bold"><LinkWithIcon onClick={} icon={<IoMdAddCircle />} to="">Add Review</LinkWithIcon></li>}
                    {reviews&& reviews.map(review =>
                    <li className="list-btn font-semibold"><LinkWithIcon onClick={() => setCurrentReview(review)} icon={<MdEdit />} to="">{review.sender}</LinkWithIcon></li>
                    )}
                </RoundedList>
            </>    
            }
        </div>
    );
}

export default AdminPage;