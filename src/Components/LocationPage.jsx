import { useEffect, useContext } from "react";

// Components
import Select from 'react-select';

// Context
import { RefContext } from "../App";

const LocationPage = () => {
    const { setShowHeaderFooter, locations, setLocations } = useContext(RefContext);

    useEffect(() =>{
        setShowHeaderFooter(false);
    }, []);

    return (
        <main className="size-full min-h-screen col-flex-center justify-content flex-grow">
            <Select />
        </main>
    );
}

export default LocationPage