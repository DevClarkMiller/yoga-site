import { useContext, useMemo } from "react";
import { useParams, Link } from "react-router-dom"

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

const LocationClass = ({_class}) =>{
    const { setSelectedClass } = useContext(RefContext);

    //TODO: FIX THE POSITIONING!!!!!!!!!!!!!!
    return(
        <li className="h-72 lg:h-96 w-1/2 lg:w-1/4 rounded col-flex-center justify-between  overflow-hidden shadow-gray-400 shadow-md">
            <img className="size-full" src={`data:image/webp;base64,${_class?.image64 ? _class.image64 : testImg}`} />
            <div className="col-flex-center w-full">
                <div className="flex justify-between w-full">
                    <span className="font-bold text-3xl text-black rounded p-2">{_class?.title}</span>
                    <span className="font-bold text-3xl text-green-900 rounded p-2">${_class?.fee}</span>
                </div>
            </div>

            {/* <Link onClick={() => setSelectedClass(_class)} className={`size-full min-h-64 w-full col-flex-center justify-center !no-underline`}
                onClickCapture={() => localStorage.setItem("selectedClass", JSON.stringify(_class))}
                to="class"
            >
                <img className="w-full" src={`data:image/webp;base64,${_class?.image64 ? _class.image64 : testImg}`} />
                <span className="font-bold text-3xl text-black rounded p-2">{_class?.title}</span>
            </Link> */}
        </li>
    );
}

const SingleLocationPage = ({locations}) => {
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
            <ul className="size-full flex justify-center items-center flex-grow flex-wrap p-0 gap-3 font-Poetson">{
            classes?.map((_class) => <LocationClass key={`${_class.class_ID} ${_class.location_ID}`} _class={{..._class, ...location}}/>)
            }</ul>
        </main>
    );
}

export default SingleLocationPage