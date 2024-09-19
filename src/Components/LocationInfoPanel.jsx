import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Components
import ClassInformation from "./ClassInformation";

// Images
import template from '../Images/yogaTemplateBW.png';
import mirroredTemplate from '../Images/mirroredYogaTemplateBW.png';

const LocationClass = ({_class}) =>{
    return(
        <li className=""><Link to={`class/${_class?.title}`} >{_class?.title}</Link></li>
    );
}

const LocationInfoPanel = ({config, className}) => {
    const navigate = useNavigate();
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

    useEffect(() => console.log(config), [config]);

    const onClassClick = () =>{

    }

    return (
        <div className={`${className} size-full flex-grow col-flex-center justify-center`}>
            <ul>{config?.classes?.map((_class) => <LocationClass key={_class?.description} _class={_class}/>)}</ul>

            {/* <ClassInformation config={config} template={template} isHeader={true} usingFooterImg={usingFooterImg}/>
            {usingFooterImg ? 
                <ClassInformation config={config} template={mirroredTemplate} isFooter={true} usingFooterImg={usingFooterImg}/> 
                : 
                <ClassInformation config={config} template={null} isFooter={true} usingFooterImg={usingFooterImg}/>
            } */}
        </div>
    )
}

export default LocationInfoPanel;