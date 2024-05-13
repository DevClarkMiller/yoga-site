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

const Content = () =>{
    const context = useContext(RefContext);
    const {aboutRef, datesRef} = context;

    return(
        <main>
            <Panel 
                itemRef={null}
                layout={0}
                image={lady}
                altText={"Lady meditating in the glowing sun"}
                /*
                    text={"With the 200-hour yoga teacher training and the 300-hour advanded training, I've achieved the 500-hour yoga instructor certification. With my experience, I have dedicated myself to the art of restorative yoga which has been fundamental in toning down my adhd mind and giving my nervous system the oppertunity to heal from the years of stress."}
                */
                bgColour={""}
                /*
                title={'Qualifications and focus'}
                */
                title={'Yoga with Andrea'}
            />
            <Panel
                itemRef={aboutRef}
                layout={1}
                image={mugshot}
                altText={"asds"}
                text={"After the birth of my first son, I began attending yoga classes to enhance my physical health and flexibility. Nonetheless, it took me several years to realize that yoga was more than just practicing physical asana postures. It was during my 200-hour teacher training that I learned about the 8 limbs of yoga. My training introduced me to the practices of meditation, breath awareness, and the concepts of Yamas and Niyamas. This is where I started to awaken to my true state of being through this inward focus. I began to bring yoga off the mat and into my daily life. I soon discovered the benefits of Restorative Yoga, which helped quiet my hyperactive ADHD body and brain and began to heal my nervous system from years of stress. Through my Restorative Yoga practice, I learned how to consciously rest and turn my attention inward without judgment. After completing my 200-hour yoga teacher training, I was inspired to continue my journey and dedicated myself to completing the 300-hour advanced training. I am proud to say that I have now achieved the 500- hour yoga instructor certification. Yoga does not just change the way we see things; it transforms the person who sees it. B.K.S Iyengar"}
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