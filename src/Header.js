import { Link, useNavigate } from "react-router-dom";

const Header = () =>{
    //Still dunno why I do this, just makes it work
    const navigate = useNavigate();

    return(
        <header>
            <nav>
                <ul>
                    <li><a href="#">Top</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact Me</a></li>
                    <li><a href="#">Dates</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;