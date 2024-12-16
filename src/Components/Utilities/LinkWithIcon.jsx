import { Link } from "react-router-dom";

const LinkWithIcon = ({onClick, to = '/', icon, children, li}) =>{
    return(<>
            {!li ? 
                <Link onClick={onClick} className="!no-underline flex justify-between w-full items-center" to={to}>
                <div className="flex-grow">{children}</div>{icon} </Link> 
                    :
                <li className="list-btn font-bold">
                    <Link onClick={onClick} className="!no-underline flex justify-between w-full items-center" to={to}>
                    <div className="flex-grow">{children}</div>{icon} </Link>
                </li>
            }
        </>
    );   
}


export default LinkWithIcon;