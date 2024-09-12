import { useEffect, useContext } from "react";
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

const defConf = {
    title: "RESTORATIVE YOGA",
    subtitle: "Rest and Relax",
    description: "Guided breath awareness, meditation and Restorative poses with the support of props.",
    fee: 10,
    dateTimes: [{
      weekDays: "Thursday",
      month: "September",
      days: "6, 13, 20, 27",
      times: "7-8pm"
    }]
}

const SingleLocationPage = ({locations}) => {
    // Context
    const { setShowHeaderFooter } = useContext(RefContext);
    
    const { index } = useParams();

    // Memoized values

    useEffect(() => {setShowHeaderFooter(false)}, []);

    useEffect(() =>{console.log(`Index is: ${index}`)}, [index]);

    return (
        <div className="size-full min-h-screen col-flex-center">
            <LocationInfoPanel config={defConf} className="bg-white"/>
        </div>
    )
}

export default SingleLocationPage