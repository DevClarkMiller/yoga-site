import { useEffect, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Select from 'react-select';

// Context
import { RefContext } from "../App";

const LocationPage = () => {
    const navigate = useNavigate();

    // Context
    const { setShowHeaderFooter, locations, setLocations } = useContext(RefContext);

    // State
    const [selectedLocation, setSelectedLocation] = useState(null);

    // Memoized values
    const locationNames = useMemo(() => {
        if (!locations) return null;
        let locs = [];
        locations.forEach((location) =>{
            locs.push({value: locations.indexOf(location), label: location?.address});
        });
        return locs;
    }, [locations]);

    useEffect(() =>{
        setShowHeaderFooter(false);
    }, []);

    useEffect(() =>{ console.log(selectedLocation); }, [selectedLocation]);

    const onGo = () =>{
        navigate(`selectedLocation/${selectedLocation}`);
    }

    return (
        <main className="size-full h-screen min-h-screen col-flex-center justify-content flex-grow gap-3">
            <Select onChange={option => setSelectedLocation(option?.value)} options={locationNames} placeholder="Select Location"/>
            <button disabled={selectedLocation === null} onClick={onGo} className={`neumorphic-btn ${selectedLocation === null ? "bg-gray-300" : "bg-light-turqoise"}`}>Go</button>
        </main>
    );
}

export default LocationPage