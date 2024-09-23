import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"

// Components
import ClassInformation from "./ClassInformation"

// Context
import { RefContext } from "../App";

const ClassInfoPanel = () => {
    const navigate = useNavigate();
    const VIEW_CHANGE = 850;

    // Context
    import { selectedLocation, selectedClass}

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
        <div>ClassInfoPanel
            <ClassInformation config={location} template={template} isHeader={true} usingFooterImg={usingFooterImg}/>
            
            
            {usingFooterImg ? 
                <ClassInformation config={location} template={mirroredTemplate} isFooter={true} usingFooterImg={usingFooterImg}/> 
                : 
                <ClassInformation config={location} template={null} isFooter={true} usingFooterImg={usingFooterImg}/>
            } 
        </div>
    )
}

export default ClassInfoPanel