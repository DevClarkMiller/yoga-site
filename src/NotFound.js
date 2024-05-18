import { Link } from "react-router-dom";
import { useContext, useEffect } from 'react'
import { RefContext } from './App'

const NotFound = () =>{
    const context = useContext(RefContext);
    const {appRef, setIsAdmin} = context;

   //Switches whenever the page loads at all
    useEffect(() =>{
        if(appRef.current){
            setIsAdmin(true);
            appRef.current.classList.add('centerContent');
            appRef.current.classList.add('fullHeight');
        }    
    }, []);

    return(
        <div className="notFound">
            <h1>Page Not Found 😢</h1>
            <Link to="/">Take me Home</Link>
        </div>
    )
}

export default NotFound;