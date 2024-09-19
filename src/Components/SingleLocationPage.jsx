import { useEffect, useContext, useState, useMemo } from "react";
import { useParams } from "react-router-dom"

// Components
import DatesPanel from "./DatesPanel";
import LocationInfoPanel from "./LocationInfoPanel";

// Pages

// Images
import template from '../Images/yogaTemplateBW.png';
import mirroredTemplate from '../Images/mirroredYogaTemplateBW.png'

// Context
import { RefContext } from "../App";

const SingleLocationPage = ({locations}) => {
    // Context
    const { setShowHeaderFooter } = useContext(RefContext);
    
    const { index } = useParams();

    // Memoized values
    const location = useMemo(() => {
        if (!locations || !index) return null;
        return locations[index];
    } ,[locations, index]);

    useEffect(() => {setShowHeaderFooter(false)}, []);  // Disables header and footer

    return (
        <div className="size-full min-h-screen col-flex-center">
            <LocationInfoPanel config={location}/>
        </div>
    )
}

export default SingleLocationPage