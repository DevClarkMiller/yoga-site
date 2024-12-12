import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"

// Components
import ClassInformation from "./ClassInformation"

// Images
import template from '../Images/yogaTemplateBW.png';
import mirroredTemplate from '../Images/mirroredYogaTemplateBW.png';

// Context
import { RefContext } from "../App";

const ClassInfoPanel = () => {
    const navigate = useNavigate();
    const VIEW_CHANGE = 850;

    const { name } = useParams();

    console.log(name);

    // Context
    const { selectedLocation, selectedClass } = useContext(RefContext);
 
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

    useEffect(() =>console.log(selectedClass), [selectedClass]);

    return (            
        <div className="datesSection h-screen items-center">
            <ClassInformation template={template} isHeader={true} usingFooterImg={usingFooterImg}/>
            
            {usingFooterImg ? 
                <ClassInformation template={mirroredTemplate} isFooter={true} usingFooterImg={usingFooterImg}/> 
                : 
                <ClassInformation template={null} isFooter={true} usingFooterImg={usingFooterImg}/>
            } 
        </div>
    )
}

export default ClassInfoPanel