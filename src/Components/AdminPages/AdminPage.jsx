
// Components
import LinkWithIcon from "../Utilities/LinkWithIcon";
import RoundedList from "../Utilities/RoundedList";

// Icons
import { MdEdit } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const AdminPage = ({ handleSet, dispatch, content, pageType = "Content", canAdd = false, updateID, updateName = null, extraRows, updateNameFunc }) => {

    return (
        <div className="w-full h-fit flex-grow col-flex-center justify-center">
            {!content ? <h2>{`No ${pageType} found!`}</h2> : 
            <>
                <RoundedList title={`Modify ${pageType}`}>
                    {extraRows&& extraRows}
                    {canAdd&&<LinkWithIcon bold li onClick={() => dispatch({
            type:"RESET_FIELDS"})} icon={<IoMdAddCircle />} to="create">{`Add ${pageType}`}</LinkWithIcon>}
                    {content.map(item =>
                    <LinkWithIcon li onClick={() => handleSet(item)} icon={<MdEdit />} to={`update/${item[updateID]}`}>{updateNameFunc ? updateNameFunc(item) : item[updateName]}</LinkWithIcon>
                    )}
                </RoundedList>
            </>    
            }
        </div>
    );
}

export default AdminPage;