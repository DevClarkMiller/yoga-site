import { TiSocialFacebook, TiSocialInstagram } from "react-icons/ti";
import Socials from "./Socials";
const SocialsList = () =>{
    return(
        <div className="socialsList">
            <ul>
                <li><Socials iconColour={"white"} icon={<TiSocialFacebook />} url={"https://www.facebook.com/profile.php?id=100090242467077"} bgColour={"blue"}/></li>
                
                <li><Socials iconColour={"white"} icon={<TiSocialInstagram />} url={"https://www.instagram.com/yoga.withandrea/"} bgColour={"purple"}/></li>
            </ul>
        </div>
    )
}

export default SocialsList; 