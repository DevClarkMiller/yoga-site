import Panel from "./Panel";
import Dates from "./Dates";
import MotivationPanel from "./MotivationPanel";
import conventionPic from './Images/conventionPic.jpg';
import mugshot from './Images/andreaPic.jpg';
import template from './Images/yogaTemplateBW.png';
import { useContext } from "react";
import { RefContext } from "./App";
import ContentConfig from './ConfigFiles/ContentConfig.json';

const Content = () =>{
    const context = useContext(RefContext);
    const {aboutRef, datesRef, appRef, datesHeader, datesFooter} = context;

    //Pulls data from the api to get info for the dates
    const data = fetch('http://134.122.41.43/datesConfig/put/footer')
    .then(res => res.json())
    .catch(error => {
        console.error('Error:', error);
    });

    if(appRef.current){
        appRef.current.classList.remove('fullHeight');
    }

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