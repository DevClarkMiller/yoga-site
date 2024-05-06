import './Panel.css'

const Panel = ({
    layout, image, altText, text, bgColour
}) =>{
    //Sets background color css to be the prop
    const css = {backgroundColor: bgColour};
    //Adjusts the className of the panel based off the layout prop
    let panelType;
    switch(layout){
        case 0:
            panelType = "panel0"
            break;
        case 1:
            panelType = "panel1"
            break;
        default:
    }

    return(
        //Added some default values for each panel type with
        //generalPanel
        <div className={"generalPanel" + " " + panelType} style={css}>
            <div className='imgContainer'>
                <img src={image} alt={altText} />
            </div>
            <p>{text}</p>
        </div>
    )
}

export default Panel;