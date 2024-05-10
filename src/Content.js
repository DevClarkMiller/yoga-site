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
import { useContext, useRef } from "react";
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
                text={"Invigorate your mind, body, and spirit with our diverse yoga classes! Whether you're a seasoned yogi seeking a challenge or a complete beginner curious to explore, we offer a variety of practices tailored to all levels. Find inner peace, increase flexibility and strength, and discover the joy of mindful movement. Join us on the mat and embark on your yoga journey today!"}
                bgColour={"#fff"}
            />
            <Panel
                imageClass={'squarePic'}
                itemRef={aboutRef}
                layout={1}
                image={mugshot}
                altText={"asds"}
                text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
                bgColour={""}
                bgImg={clouds2}
                
            />
            <MotivationPanel></MotivationPanel>
            <div ref={datesRef}></div>
            <Dates DateConfig={DateConfig[0]} template={template}/>
            <Dates DateConfig={DateConfig[1]} template={empty}/>


        </main>
    );
}

export default Content;