import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Components
import ClassInformation from "./ClassInformation";

// Images
import template from '../Images/yogaTemplateBW.png';
import mirroredTemplate from '../Images/mirroredYogaTemplateBW.png';

import testImg from './TestBase64Img';

const LocationClass = ({_class}) =>{
    return(
        <li className="size-full flex-grow col-flex-center">
            <Link className={`size-full min-h-64 flex-grow col-flex-center justify-center text-black bg-no-repeat bg-center bg-contain !no-underline`}
                to={`class/${_class?.title}`}
                style={{
                    backgroundImage: `url('${testImg}')`
                }}
            >
                <span className="backdrop-blur-xl font-bold text-3xl text-white rounded p-2 shadow-sm">{_class?.title}</span>
            </Link>
        </li>
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

    return (
        <div className={`${className} size-full flex-grow col-flex-center justify-center p-3`}>
            <ul className="size-full flex-grow p-0">{config?.classes?.map((_class) => <LocationClass key={_class?.description} _class={_class}/>)}</ul>

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