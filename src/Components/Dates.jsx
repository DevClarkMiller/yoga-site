import { useEffect, useState } from 'react';

// CSS
import '../template.css'

// Components
import ScaleText from "react-scale-text";

const Dates = ({DateConfig, template, isHeader, isBody, isFooter, usingFooterImg}) =>{
    const css = (isHeader) ?  {backgroundColor: DateConfig?.header?.colour} : (isBody) ? {backgroundColor: "#fff"} : {backgroundColor: DateConfig?.footer?.colour};

    return(
        (isHeader) ?
        <div style={css} className='dates'>
            <div className='templateContainer'>
                <img src={template} alt="template for the dates available" />
                <div className={`textContainer templateText fullHeightWidth`}>
                    <h2>{DateConfig?.general?.title}</h2>
                    <h3>{DateConfig?.general?.subtitle}</h3>
                    <p className='description'>{DateConfig?.general?.description}</p>

                    <span className='middle'>
                        <span className='dateInfo'>
                            <h2>{DateConfig?.header?.day}, {DateConfig?.header?.month}</h2>
                            <h2>{DateConfig?.header?.daysAvailable}</h2>
                        </span>
                        <span className='times'><h2>{DateConfig?.header?.times}</h2></span>
                    </span>
                </div>
            </div>
        </div> : 

        (isBody) ? 
        <div style={css}></div>
        :  
        //Only remaining posibility is the dates footer
        <div style={css} className='datesFooter borderTopDash'>
           <div className='templateContainer'>
            {template && <img src={template} alt="template for the dates available" />}
                <div className={`textContainer ${usingFooterImg && 'templateText'} fullWidth fitHeight`}>
                    <span className='middle'>
                        <span className='dateInfo'>
                            <h2>{DateConfig?.footer?.day}, {DateConfig?.footer?.month}</h2>
                            <h2>{DateConfig?.footer?.daysAvailable}</h2>
                        </span>
                        <span className='times'><h2>{DateConfig?.footer?.times}</h2></span>
                    </span>
                    <span className='bottom spaceTop'>
                        <p>{DateConfig?.general?.orgName}</p>
                        <p>{DateConfig?.general?.location}</p>
                        <p>Investment ${DateConfig?.general.fee} per class</p>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Dates;