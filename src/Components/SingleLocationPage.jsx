import { useEffect, useContext, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom"

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
    const navigate = useNavigate();
    const VIEW_CHANGE = 850;

    const { index } = useParams();

    const { setUsingFooterImg } = useContext(RefContext)

    // Memoized values
    const location = useMemo(() => {
        if (!locations || !index) return null;
        return locations[index];
    } ,[locations, index]);

    const handleResize = () => {
        if(window.innerWidth >= VIEW_CHANGE){
            console.log();
            setUsingFooterImg(true);
        }else{
            setUsingFooterImg(false);
        }
    };

    useEffect(() =>{
        window.addEventListener('resize', handleResize);
        handleResize();
    }, []);

    return (
        <div className="size-full min-h-screen col-flex-center">
            <LocationInfoPanel config={location}/>
        </div>
    );
}

export default SingleLocationPage