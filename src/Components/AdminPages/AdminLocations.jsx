import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

// Context
import { RefContext } from "../../App";

const AdminLocations = ({ handleSetLocation, dispatchLocation }) => {
    const { locations } = useContext(RefContext);

    return (
        <div className="w-full col-flex-center">
            {!locations ? <h2>No locations found!</h2> : 
            <>
                <h2>Modify Locations</h2>
                <a className="text-3xl w-full text-center font-bold pb-3" target="_blank" href="https://www.latlong.net/convert-address-to-lat-long.html">Get Long and Lat from Address</a>
                <ul className="col-flex-center justify-center w-1/2 p-0 text-2xl">
                    <li className="w-full text-center font-bold"><Link onClick={() => dispatchLocation({
            type:"RESET_FIELDS"
        })} className="!no-underline" to="create">Add Location</Link></li>
                    {locations.map(location =>
                    <li className="w-full text-center font-semibold"><Link onClick={() => handleSetLocation(location)} className="!no-underline" to={`update/${location.location_ID}`}>{location.address}</Link></li>
                    )}
                </ul>
            </>    
            }
        </div>
    );
}

export default AdminLocations