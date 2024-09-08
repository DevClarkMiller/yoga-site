
// Components
import Socials from "./Socials";

// Icons
import { TiSocialFacebook, TiSocialInstagram } from "react-icons/ti";
import { MdOutlineEmail } from "react-icons/md";

const SocialsList = () =>{
    return(
        <div className="socialsList">
            <ul>
                <li><Socials iconColour={"white"} icon={<TiSocialFacebook />} url={"https://www.facebook.com/profile.php?id=100090242467077"} bgColour={"blue"} useTarget={true}/></li> 

                <li><Socials iconColour={"white"} icon={<TiSocialInstagram />} url={"https://www.instagram.com/yoga.withandrea/"} bgImage={"linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7)"} fontSize={"38px"} useTarget={true}/></li>

                <li><Socials iconColour={"white"} icon={<MdOutlineEmail />} url={"mailto:andreasaueryoga@yahoo.com"} bgColour={"#F44336"} fontSize={"38px"}/></li>
            </ul>
        </div>
    )
}

export default SocialsList;