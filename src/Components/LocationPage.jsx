import { useEffect, useContext, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Components
import Select from 'react-select';

// Icons
import { TbLocationFilled, TbLocation  } from "react-icons/tb";

// Context
import { RefContext } from "../App";

const SelectLocation = ({location, index}) =>{
    return(
        <li className="group">
            <Link className="!no-underline flex items-center gap-3 font-semibold" to={`selectedLocation/${index}`}>
                <>{location?.address}</>
                <TbLocationFilled className="nice-trans group-hover:text-green-500"/>
            </Link>
        </li>
    );
}

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

    useEffect(() =>{ console.log(locations); }, [locations]);

    return (
        <main className="size-full h-screen min-h-screen col-flex-center justify-between flex-grow gap-3 p-3">
            <h2 className="mt-5">Select Location</h2>

            <ul className="w-fit flex-grow col-flex-center justify-center p-5 m-0">
                {locations?.map((location, index) =>(
                    <SelectLocation key={location?.address} index={index} location={location}/>
                ))}
            </ul>
            {/* <Select onChange={option => setSelectedLocation(option?.value)} options={locationNames} placeholder="Select Location"/> */}
            {/* <button disabled={selectedLocation === null} onClick={onGo} className={`neumorphic-btn ${selectedLocation === null ? "bg-gray-300" : "bg-light-turqoise"}`}>Go</button> */}
        </main>
    );
}

export default LocationPage