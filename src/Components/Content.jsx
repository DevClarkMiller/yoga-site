import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, } from "react-router-dom";

// Components
import Panel from './Panels/Panel';
import ListPanel from "./Panels/ListPanel";
import ReviewsPanel from "./Panels/ReviewsPanel";
import Map from "./Map";

// Images
import conventionPic from '../Images/conventionPic.jpg';
import mugshot from '../Images/andreaPic.jpg';

// Context
import { RefContext } from "../App";

const Content = () =>{
    const navigate = useNavigate();

    const { setIsAdmin, aboutRef, datesRef, appRef, datesConfigAll, contentConfig, qualifications, setShowHeaderFooter, locations } = useContext(RefContext);
    const VIEW_CHANGE = 850;

    const [usingFooterImg, setUsingFooterImg] = useState(false);

    if(appRef.current){
        appRef.current.classList.remove('fullHeight');
        appRef.current.classList.remove('centerContent');
    }

    const handleResize = () => {
        if(window.innerWidth >= VIEW_CHANGE){
            console.log();
            setUsingFooterImg(true);
        }else{
            setUsingFooterImg(false);
        }
    };

    useEffect(() =>{
        setShowHeaderFooter(true);
        setIsAdmin(false);
        window.addEventListener('resize', handleResize);
        handleResize();
    }, []);

    return(
        contentConfig &&
        <main>
            <div className="panelDuo">
                <Panel 
                    config={contentConfig[0]}
                    image={conventionPic}
                    altText={"Lady meditating in the glowing sun"}
                />
                <ListPanel config={contentConfig[1]} list={qualifications}/>
            </div>

            <div className="panelSoloReviews">
                <Panel
                    config={contentConfig[2]}
                    itemRef={aboutRef}
                    image={mugshot}
                    altText={"asds"}
                />
                <ReviewsPanel />
            </div>            
            
            <div ref={datesRef}></div>
            <h3 className="text-4xl font-semibold font-Poetson">Locations</h3>
            <Map locations={locations}/>
        </main>
    );
}

export default Content;