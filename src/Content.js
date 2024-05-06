import Panel from "./Panel";
import lady from './Images/lady.jpg'
import instructor from './Images/instructor.png'

const Content = () =>{
    return(
        <main>
            <Panel 
                layout={0}
                image={lady}
                altText={"Lady meditating in the glowing sun"}
                text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
                bgColour={""}
            />
            <Panel
                layout={1}
                image={instructor}
                altText={"asds"}
                text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
                bgColour={"#fff"}
            />
        </main>
    )
}

export default Content;