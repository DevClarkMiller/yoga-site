import { useEffect, useState } from "react";

// Components
import Dates from "./Dates";

// Images
import template from '../Images/yogaTemplateBW.png';
import mirroredTemplate from '../Images/mirroredYogaTemplateBW.png'


const DatesPanel = ({datesConfigAll}) => {
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
        <div className="datesSection">
            <Dates DateConfig={datesConfigAll} template={template} isHeader={true} usingFooterImg={usingFooterImg}/>
            {usingFooterImg ? 
                <Dates DateConfig={datesConfigAll} template={mirroredTemplate} isFooter={true} usingFooterImg={usingFooterImg}/> 
                : 
                <Dates DateConfig={datesConfigAll} template={null} isFooter={true} usingFooterImg={usingFooterImg}/>
            }
        </div>
    );
}

export default DatesPanel