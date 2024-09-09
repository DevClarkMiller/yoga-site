import { useEffect, useContext } from "react";

// Context
import { RefContext } from "../App";

const LocationPage = () => {
    const { setShowHeaderFooter } = useContext(RefContext);

    useEffect(() =>{
        setShowHeaderFooter(false);
    }, []);

    return (
        <main className="size-full min-h-screen col-flex-center">
            
        </main>
    );
}

export default LocationPage