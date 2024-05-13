import Panel from "./Panel";
import Dates from "./Dates";
import MotivationPanel from "./MotivationPanel";
import lady from './Images/lady.jpg'
import instructor from './Images/instructor.png'
import mugshot from './Images/andreaPic.jpg'
import empty from './Images/Empty.png'
import template from './Images/yogaTemplateBW.png'
import clouds1 from './Images/clouds.webp';
import clouds2 from './Images/clouds2.png';
import { useContext } from "react";
import { RefContext } from "./App";
import DateConfig from './ConfigFiles/DatesConfig.json'
import ContentConfig from './ConfigFiles/ContentConfig.json'

const Content = () =>{
    const context = useContext(RefContext);
    const {aboutRef, datesRef} = context;

    return(
        <main>
            <Panel 
                config={ContentConfig[0]}
                itemRef={null}
                layout={0}
                image={lady}
                altText={"Lady meditating in the glowing sun"}
                /*
                    text={"With the 200-hour yoga teacher training and the 300-hour advanded training, I've achieved the 500-hour yoga instructor certification. With my experience, I have dedicated myself to the art of restorative yoga which has been fundamental in toning down my adhd mind and giving my nervous system the oppertunity to heal from the years of stress."}
                */
                text={"Restorative yoga, in St.Thomas Ontario 'inhale love, exhale gratitude"}
                /*
                title={'Qualifications and focus'}
                */
                title={'Yoga with Andrea'}
            />
            <Panel
                config={ContentConfig[1]}
                itemRef={aboutRef}
                layout={1}
                image={mugshot}
                altText={"asds"}
                bgColour={""}
                //bgImg={clouds2}
            />
            <MotivationPanel></MotivationPanel>
            <div ref={datesRef}></div>
            <Dates DateConfig={DateConfig[0]} template={template}/>
            <Dates DateConfig={DateConfig[1]} template={empty}/>


        </main>
    );
}

export default Content;