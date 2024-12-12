import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

// Components
import Dates from "./Dates";
import Panel from './Panels/Panel';
import ListPanel from "./Panels/ListPanel";
import ReviewsPanel from "./Panels/ReviewsPanel";
import Map from "./Map";

// Images
import conventionPic from '../Images/conventionPic.jpg';
import mugshot from '../Images/andreaPic.jpg';
import template from '../Images/yogaTemplateBW.png';
import mirroredTemplate from '../Images/mirroredYogaTemplateBW.png';

// Icons
import { TbLocationFilled, TbLocation  } from "react-icons/tb";

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
                {/*
                <Panel 
                    config={contentConfig.secondPanel}
                />*/}
            </div>

            <div className="panelSoloReviews">
                <Panel
                    config={contentConfig[2]}
                    itemRef={aboutRef}
                    image={mugshot}
                    altText={"asds"}
                    //bgImg={clouds2}
                />
                <ReviewsPanel />
            </div>            
            
            <div ref={datesRef}></div>
            {/* <div className="datesSection">
                <Dates DateConfig={datesConfigAll} template={template} isHeader={true} usingFooterImg={usingFooterImg}/>
                {usingFooterImg ? 
                    <Dates DateConfig={datesConfigAll} template={mirroredTemplate} isFooter={true} usingFooterImg={usingFooterImg}/> 
                    : 
                    <Dates DateConfig={datesConfigAll} template={null} isFooter={true} usingFooterImg={usingFooterImg}/>
                }
            </div> */}

            {/* <div className="w-full min-h-64 bg-light-turqoise col-flex-center justify-center">
                <button onClick={() => navigate('/location')} className="neumorphic-btn bg-turqoise">See Available Dates</button>
            </div> */}

            <h3 className="text-4xl font-semibold font-Poetson">See Location Details</h3>
            <Map locations={locations}/>
        </main>
    );
}

export default Content;