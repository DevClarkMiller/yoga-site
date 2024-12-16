import { Link } from "react-router-dom";

const AdminNavList = ({links}) => {
    return (
        <ul className="buttonsNav font-bold mt-10 flex-wrap size-full">
            {links&& links.map((link) => <li><Link to={`/admin${link.to}`} className="sendButton no-underline">{link.name}</Link></li>)}
        </ul>
    );
}

export default AdminNavList