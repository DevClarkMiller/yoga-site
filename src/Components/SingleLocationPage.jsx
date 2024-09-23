import { useEffect, useContext, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"

// Components
import DatesPanel from "./DatesPanel";
import ClassInformation from "./ClassInformation";

// Pages

// Images
import template from '../Images/yogaTemplateBW.png';
import mirroredTemplate from '../Images/mirroredYogaTemplateBW.png';
import testImg from './TestBase64Img';


// Context
import { RefContext } from "../App";

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

const SingleLocationPage = ({locations}) => {
    const navigate = useNavigate();
    const VIEW_CHANGE = 850;

    const { index } = useParams();

    const [usingFooterImg, setUsingFooterImg] = useState(false);

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
        <div className="size-full min-h-screen col-flex-center flex-grow col-flex-center justify-center p-3">
            <ul className="size-full flex-grow p-0">{location?.classes?.map((_class) => <LocationClass key={_class?.description} _class={_class}/>)}</ul>
            {/* <LocationInfoPanel config={location}/> */}
            {/* <ClassInformation config={location} template={template} isHeader={true} usingFooterImg={usingFooterImg}/> */}
            
            
            {/* {usingFooterImg ? 
                <ClassInformation config={location} template={mirroredTemplate} isFooter={true} usingFooterImg={usingFooterImg}/> 
                : 
                <ClassInformation config={location} template={null} isFooter={true} usingFooterImg={usingFooterImg}/>
            } */}
        </div>
    );
}

export default SingleLocationPage