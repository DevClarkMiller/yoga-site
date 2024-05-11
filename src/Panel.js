import './Panel.css'

const Panel = ({
    imageClass, layout, image, altText, text, bgColour, itemRef, bgImg, title
}) =>{
    //Sets background color css to be the prop
    let css = {backgroundColor: bgColour};
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

    if(bgImg){
        const bgCss = {background: `url(${bgImg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'bottom center'};
        css = {...css, ...bgCss};
    }

    return(
        //Added some default values for each panel type with
        //generalPanel
        <div ref={itemRef} className={`generalPanel ${panelType}`} style={css}>
            <div className={'imgContainer'}>
                {(imageClass) ? 
                    <img className={imageClass} src={image} alt={altText} />
                :
                    <img src={image} alt={altText} />
                }
            </div>
            <div className='p'>
                {title && <h2>{title}</h2>}
                <p>{text}</p>
            </div>
            
        </div>
    )
}

export default Panel;