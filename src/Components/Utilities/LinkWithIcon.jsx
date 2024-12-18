import { Link } from "react-router-dom";

const LinkWithIcon = ({onClick, to = '/', icon, children, li, bold = false}) =>{
    return(<>
            {!li ? 
                <Link onClick={onClick} className={`!no-underline flex justify-between w-full items-center ${bold ? "font-bold" : "font-medium"}`} to={to}>
                <div className="flex-grow">{children}</div>{icon} </Link> 
                    :
                <li className="list-btn">
                    <Link onClick={onClick} className={`!no-underline flex justify-between w-full items-center ${bold ? "font-bold" : "font-medium"}`} to={to}>
                    <div className="flex-grow">{children}</div>{icon} </Link>
                </li>
            }
        </>
    );   
}


export default LinkWithIcon;