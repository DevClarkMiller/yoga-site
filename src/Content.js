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

    if(appRef.current){
        appRef.current.classList.remove('fullHeight');
        appRef.current.classList.remove('centerContent');
    }

    useEffect(() =>{
        setIsAdmin(false);
        console.log(datesConfigAll);
    }, []);

    return(
        contentConfig &&
        <main>
            <Panel 
                config={contentConfig.firstPanel}
                image={conventionPic}
                altText={"Lady meditating in the glowing sun"}
            />
            <Panel 
                config={contentConfig.secondPanel}
            />
            <Panel
                config={contentConfig.thirdPanel}
                itemRef={aboutRef}
                image={mugshot}
                altText={"asds"}
                //bgImg={clouds2}
            />
            
            <MotivationPanel></MotivationPanel>
            <div ref={datesRef}></div>
            <Dates DateConfig={datesConfigAll} template={template} isHeader={true}/>
            <Dates DateConfig={datesConfigAll} template={null} isFooter={true}/>
        </main>
    );
}

export default Content;