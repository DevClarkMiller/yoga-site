import Panel from "./Panel";
import Dates from "./Dates";
import MotivationPanel from "./MotivationPanel";
import conventionPic from './Images/conventionPic.jpg';
import mugshot from './Images/andreaPic.jpg';
import template from './Images/yogaTemplateBW.png';
import { useContext, useEffect } from "react";
import { RefContext } from "./App";
import ContentConfig from './ConfigFiles/ContentConfig.json';

const Content = ({setIsAdmin}) =>{
    const context = useContext(RefContext);
    const {aboutRef, datesRef, appRef, datesHeader, datesFooter} = context;

    if(appRef.current){
        appRef.current.classList.remove('fullHeight');
        appRef.current.classList.remove('centerContent');
    }

    useEffect(() =>{
        setIsAdmin(false);
    }, []);

    return(
        <main>
            <Panel 
                config={ContentConfig[0]}
                image={conventionPic}
                altText={"Lady meditating in the glowing sun"}
                text={"Restorative yoga, in St.Thomas Ontario 'inhale love, exhale gratitude"}
                title={'Yoga with Andrea'}
            />
            <Panel config={ContentConfig[2]}/>
            <Panel
                config={ContentConfig[1]}
                itemRef={aboutRef}
                image={mugshot}
                altText={"asds"}
                //bgImg={clouds2}
            />
            
            <MotivationPanel></MotivationPanel>
            <div ref={datesRef}></div>
            <Dates DateConfig={datesHeader} template={template}/>
            <Dates DateConfig={datesFooter} template={null}/>
        </main>
    );
}

export default Content;