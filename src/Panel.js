import './Panel.css'

const Panel = ({
    config, imageClass, image, altText, itemRef, bgImg
}) =>{
    //Sets background color css to be the prop
    let css = {backgroundColor: config.colour};
    //Adjusts the className of the panel based off the layout prop
    let panelType;
    switch(config.layout){
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

    const divClass = (image) ? 'generalPanelGrid' : 'generalPanelFlex';

    return(     
        //Added some default values for each panel type with
        //generalPanel
        <div ref={itemRef} className={`${divClass} ${panelType}`} style={css}>
            {/*Only renders the image container if there's an image provided*/image &&
            <div className='imageHalf'>
                <div className={`imgContainer ${config.imgSize}`}>
                    {(imageClass) ? 
                        <img className={imageClass} src={image} alt={altText} />
                    :
                        <img src={image} alt={altText} />
                    }
                </div>
            </div>}
            <div className='headerAndP'>
                {config.header && <h2>{config.header}</h2>}
                <p>{config.text}</p>
            </div>
        </div>

    );
}

export default Panel;