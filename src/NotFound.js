import { Link } from "react-router-dom";

const NotFound = () =>{
    return(
        <main>
            <h1>Page Not Found 😢</h1>
            <Link to="/">Take me Home</Link>
        </main>
    )
}

export default NotFound;