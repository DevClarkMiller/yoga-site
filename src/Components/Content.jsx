import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Dates from "./Dates";
import Panel from './Panels/Panel';
import ListPanel from "./Panels/ListPanel";
import ReviewsPanel from "./Panels/ReviewsPanel";

// Images
import conventionPic from '../Images/conventionPic.jpg';
import mugshot from '../Images/andreaPic.jpg';
import template from '../Images/yogaTemplateBW.png';
import mirroredTemplate from '../Images/mirroredYogaTemplateBW.png'

// Context
import { RefContext } from "../App";

const Content = () =>{
    const navigate = useNavigate();

    const { setIsAdmin, aboutRef, datesRef, appRef, datesConfigAll, contentConfig, qualifications, setShowHeaderFooter } = useContext(RefContext);
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
                    config={contentConfig.firstPanel}
                    image={conventionPic}
                    altText={"Lady meditating in the glowing sun"}
                />
                <ListPanel config={contentConfig.secondPanel} list={qualifications}/>
                {/*
                <Panel 
                    config={contentConfig.secondPanel}
                />*/}
            </div>

            <div className="panelSoloReviews">
                <Panel
                    config={contentConfig.thirdPanel}
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

            <div className="w-full min-h-64 bg-light-turqoise col-flex-center justify-center">
                <button onClick={() => navigate('/location')} className="neumorphic-btn bg-turqoise">See Available Dates</button>
            </div>
        </main>
    );
}

export default Content;