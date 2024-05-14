import { ShakeRotate } from 'reshake';

const Socials = ({iconColour, icon, url, bgColour, bgImage, fontSize, useTarget}) =>{
    const containerCss = {backgroundColor: bgColour, backgroundImage: bgImage};
    const anchorCss = {color: iconColour, fontSize: fontSize}
    return(
        <ShakeRotate   >
            <div style={containerCss} className="socials"> 
                {useTarget === true ? <a style={anchorCss} href={url} target="_blank">{icon}</a> : <a style={anchorCss} href={url}>{icon}</a>}
            </div>
        </ShakeRotate   >
    );
}

export default Socials;