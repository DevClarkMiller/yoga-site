import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import Modal from "../Modal/Modal";

// Icons

// Context
import { RefContext } from "../../App";

const AdminClasses = () => {
    const { classes } = useContext(RefContext);

    useEffect(() =>{
        console.log(classes);
    }, [classes]);

    return (
        <div>
            {!classes ? <h2>No classes found!</h2> : 
                <ul className="col-flex-center">
                    <li><Link to="create">Add Class</Link></li>
                    {classes.map(_class =>
                    <li><Link to={`update/${_class.class_ID}`}>{_class.title}</Link></li>
                    )}
                </ul>
            }
        </div>
    );
}

export default AdminClasses;