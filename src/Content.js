import Panel from "./Panel";
import Dates from "./Dates";
import lady from './Images/lady.jpg'
import instructor from './Images/instructor.png'
import { useContext, useRef } from "react";
import { RefContext } from "./App";

const Content = () =>{
    const context = useContext(RefContext);
    const {aboutRef} = context;
    return(
        <main>
            <Panel 
                ref={null}
                layout={0}
                image={lady}
                altText={"Lady meditating in the glowing sun"}
                text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
                bgColour={""}
            />
            <Panel
                itemRef={aboutRef}
                layout={1}
                image={instructor}
                altText={"asds"}
                text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
                bgColour={"#fff"}
            />
            <Dates 
                pageDetails = {{
                    title: 'RESTORATIVE YOGA',
                    subtitle: 'Rest and Relax',
                    description: 'Guided breath awareness, meditation and Restorative poses with the support of props.',
                    day: 'Thursday',
                    month: 'May',
                    times: "7-8pm",
                    daysAvailable: '2, 9, 16, 23, 30',
                    orgName: 'Simply Massage and Associates',
                    location: '168 Curtis St Entrance is on Catharine St. (Teal Door)',
                    fee: 10
                }}
            />

        </main>
    );
}

export default Content;