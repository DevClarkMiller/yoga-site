const Socials = ({iconColour, icon, url, bgColour}) =>{

    const containerCss = {backgroundColor: bgColour};
    const anchorCss = {color: iconColour}
    return(
        <div style={containerCss} className="socials">
            <a style={anchorCss} href={url} target="_blank">{icon}</a>
        </div>
    );
}

export default Socials;