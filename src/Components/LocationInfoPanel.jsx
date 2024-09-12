import { useEffect, useState } from "react";

// Components
import LocationInformation from "./LocationInformation";

// Images
import template from '../Images/yogaTemplateBW.png';
import mirroredTemplate from '../Images/mirroredYogaTemplateBW.png'

const LocationInfoPanel = ({config, className}) => {
    const VIEW_CHANGE = 850;

    // State
    const [usingFooterImg, setUsingFooterImg] = useState(false);

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
        <div className={`datesSection ${className}`}>
            <LocationInformation config={config} template={template} isHeader={true} usingFooterImg={usingFooterImg}/>
            {usingFooterImg ? 
                <LocationInformation config={config} template={mirroredTemplate} isFooter={true} usingFooterImg={usingFooterImg}/> 
                : 
                <LocationInformation config={config} template={null} isFooter={true} usingFooterImg={usingFooterImg}/>
            }
        </div>
    )
}

export default LocationInfoPanel