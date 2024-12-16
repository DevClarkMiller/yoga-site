
// Components
import LinkWithIcon from "../Utilities/LinkWithIcon";
import RoundedList from "../Utilities/RoundedList";

// Icons
import { MdEdit } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const AdminPage = ({ handleSet, dispatch, content, pageType = "Content", canAdd = false, updateID, updateName, extraRows }) => {

    return (
        <div className="w-full h-fit flex-grow col-flex-center justify-center">
            {!content ? <h2>{`No ${pageType} found!`}</h2> : 
            <>
                <RoundedList title={`Modify ${pageType}`}>
                    {extraRows&& extraRows}
                    {canAdd&&<li className="list-btn font-bold"><LinkWithIcon onClick={() => dispatch({
            type:"RESET_FIELDS"})} icon={<IoMdAddCircle />} to="create">{`Add ${pageType}`}</LinkWithIcon></li>}
                    {content.map(item =>
                    <li className="list-btn font-semibold"><LinkWithIcon onClick={() => handleSet(item)} icon={<MdEdit />} to={`update/${item[updateID]}`}>{item[updateName]}</LinkWithIcon></li>
                    )}
                </RoundedList>
            </>    
            }
        </div>
    );
}

export default AdminPage;