import { useContext, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"

// Images
import testImg from './TestBase64Img';

// Context
import { RefContext } from "../App";

// const LocationClass = ({_class}) =>{
//     const { setSelectedClass } = useContext(RefContext);

//     return(
//         <li className="h-full flex-grow w-full lg:w-52">
//             <Link onClick={() => setSelectedClass(_class)} className={`size-full min-h-64 w-full col-flex-center justify-center bg-no-repeat bg-center bg-contain !no-underline`}
//                 onClickCapture={() => localStorage.setItem("selectedClass", JSON.stringify(_class))}
//                 to="class"
//                 // style={{
//                 //     backgroundImage: `url('data:image/webp;base64,${_class?.image64 ? _class.image64 : testImg}')`
//                 // }}
//             >
//                 <span className="backdrop-blur-xl font-bold text-3xl text-black rounded p-2 shadow-sm">{_class?.title}</span>
//             </Link>
//         </li>
//     );
// }

const LocationClass = ({_class, navigate}) =>{
    const { setSelectedClass } = useContext(RefContext);

    const onNavBtnClick = () =>{
        localStorage.setItem("selectedClass", JSON.stringify(_class));
        setSelectedClass(_class);
        navigate('class')
    }

    return(
        <li className="h-80 lg:h-96 w-1/2 lg:w-1/4 rounded-lg col-flex-center justify-between  overflow-hidden shadow-gray-400 shadow-md bg-light-turqoise">
            <img className="w-full h-2/3 object-cover" alt="Class image" src={`${_class?.image64 ? _class.image64 : testImg}`} />
            <div className="col-flex-center justify-start w-full my-1 flex-grow">
                <div className="flex justify-between items-center w-full">
                    <span className="font-bold text-3xl text-black rounded p-2">{_class?.title}</span>
                    <span className="font-semibold text-2xl text-green-900 rounded p-2 font-sans">${_class?.fee}</span>
                </div>
                <div className="flex justify-between w-full p-2 items-center">
                    <div className="text-lg font-sans font-semibold">{_class?.subtitle}</div>
                    <button onClick={onNavBtnClick} className="btn btn-success">More</button>
                </div>
            </div>
        </li>
    );
}

const SingleLocationPage = ({locations}) => {
    const navigate = useNavigate();
    const { index } = useParams();

    const { locationClasses } = useContext(RefContext)


    // Memoized values
    const location = useMemo(() => {
        if (!locations || !index) return null;
        return locations[index];
    } ,[locations, index]);

    const classes = useMemo(() =>(
        locationClasses?.filter((locationClass) => locationClass.location_ID === location.location_ID)
    ), [location, locationClasses]);


    return (
        <main className="size-full min-h-screen flex-grow col-flex-center justify-between pt-24">
            <h2 className="font-bold text-4xl">Classes</h2>
            <h3 className="font-bold text-lg text-center">{location?.address}</h3>
            <ul className="size-full flex justify-center items-center flex-grow flex-wrap p-0 gap-1 lg:gap-4 font-Poetson">{
            classes?.map((_class) => <LocationClass navigate={navigate} key={`${_class.class_ID} ${_class.location_ID}`} _class={{..._class, ...location}}/>)
            }</ul>
        </main>
    );
}

export default SingleLocationPage