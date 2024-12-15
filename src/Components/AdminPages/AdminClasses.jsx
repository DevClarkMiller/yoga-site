import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import Modal from "../Modal/Modal";

// Icons

// Context
import { RefContext } from "../../App";

const AdminClasses = ({ handleSetClass, dispatchClass }) => {
    const { classes } = useContext(RefContext);

    return (
        <div className="w-full col-flex-center">
            {!classes ? <h2>No classes found!</h2> : 
            <>
                <h2>Modify Classes</h2>
                <ul className="col-flex-center justify-center w-1/2 p-0 text-2xl">
                    <li className="w-full text-center font-bold"><Link onClick={() => dispatchClass({
            type:"RESET_FIELDS"
        })} className="!no-underline" to="create">Add Class</Link></li>
                    {classes.map(_class =>
                    <li className="w-full text-center font-semibold"><Link onClick={() => handleSetClass(_class)} className="!no-underline" to={`update/${_class.class_ID}`}>{_class.title}</Link></li>
                    )}
                </ul>
            </>    
            }
        </div>
    );
}

export default AdminClasses;