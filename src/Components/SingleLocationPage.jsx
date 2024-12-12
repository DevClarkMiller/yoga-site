import { useEffect, useContext, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
import { fetchGet } from "../fetch";

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
import { AiOutlineConsoleSql } from "react-icons/ai";

const LocationClass = ({_class}) =>{
    const { setSelectedClass } = useContext(RefContext);

    return(
        <li className="h-full flex-grow w-full lg:w-52">
            <Link onClick={() => setSelectedClass(_class)} className={`size-full min-h-64 w-full col-flex-center justify-center bg-no-repeat bg-center bg-contain !no-underline`}
                to={`class/${_class?.title}`}
                style={{
                    backgroundImage: `url('data:image/webp;base64,${_class?.image64 ? _class.image64 : testImg}')`
                }}
            >
                <span className="backdrop-blur-xl font-bold text-3xl text-black rounded p-2 shadow-sm">{_class?.title}</span>
            </Link>
        </li>
    );
}

const SingleLocationPage = ({locations}) => {
    const navigate = useNavigate();
    const VIEW_CHANGE = 850;

    const { index } = useParams();

    const { locationClasses } = useContext(RefContext)

    const [usingFooterImg, setUsingFooterImg] = useState(false);

    // Memoized values
    const location = useMemo(() => {
        if (!locations || !index) return null;
        return locations[index];
    } ,[locations, index]);

    const classes = useMemo(() =>(
        locationClasses?.filter((locationClass) => locationClass.location_ID === location.location_ID)
    ), [location, locationClasses]);


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
        <div className="size-full min-h-screen flex-grow col-flex-center justify-between p-3">
            <h1>Classes</h1>
            <ul className="size-full flex justify-center items-center flex-grow flex-wrap p-0 gap-3">{
            classes?.map((_class) => <LocationClass key={`${_class.class_ID} ${_class.location_ID}`} _class={_class}/>)
            }</ul>
        </div>
    );
}

export default SingleLocationPage