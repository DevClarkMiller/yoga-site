import Panel from "./Panel";
import Dates from "./Dates";
import MotivationPanel from "./MotivationPanel";
import conventionPic from './Images/conventionPic.jpg';
import mugshot from './Images/andreaPic.jpg';
import template from './Images/yogaTemplateBW.png';
import { useContext, useEffect, useState } from "react";
import { RefContext } from "./App";

const Content = () =>{
    const {setIsAdmin, aboutRef, datesRef, appRef, datesConfigAll, contentConfig} = useContext(RefContext);
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
        setIsAdmin(false);
        console.log(datesConfigAll);
        console.log(contentConfig);
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
                <Panel 
                    config={contentConfig.secondPanel}
                />
            </div>

            <div className="panelSolo">
                <Panel
                    config={contentConfig.thirdPanel}
                    itemRef={aboutRef}
                    image={mugshot}
                    altText={"asds"}
                    //bgImg={clouds2}
                />
            </div>
            
            <div ref={datesRef}></div>
            <div className="datesSection">
                <Dates DateConfig={datesConfigAll} template={template} isHeader={true} usingFooterImg={usingFooterImg}/>
                {usingFooterImg ? <Dates DateConfig={datesConfigAll} template={template} isFooter={true} usingFooterImg={usingFooterImg}/> : <Dates DateConfig={datesConfigAll} template={null} isFooter={true} usingFooterImg={usingFooterImg}/>}
            </div>
        </main>
    );
}

export default Content;