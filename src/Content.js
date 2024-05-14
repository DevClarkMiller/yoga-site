import Panel from "./Panel";
import Dates from "./Dates";
import MotivationPanel from "./MotivationPanel";
import lady from './Images/lady.jpg';
import instructor from './Images/instructor.png';
import conventionPic from './Images/conventionPic.jpg';
import mugshot from './Images/andreaPic.jpg';
import empty from './Images/Empty.png';
import template from './Images/yogaTemplateBW.png';
import clouds1 from './Images/clouds.webp';
import clouds2 from './Images/clouds2.png';
import { useContext } from "react";
import { RefContext } from "./App";
import DateConfig from './ConfigFiles/DatesConfig.json';
import ContentConfig from './ConfigFiles/ContentConfig.json';

const Content = () =>{
    const context = useContext(RefContext);
    const {aboutRef, datesRef} = context;

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
            <Dates DateConfig={DateConfig[0]} template={template}/>
            <Dates DateConfig={DateConfig[1]} template={null}/>
        </main>
    );
}

export default Content;