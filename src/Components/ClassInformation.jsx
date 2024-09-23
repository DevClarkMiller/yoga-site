import { useContext } from "react";

// Context
import { RefContext } from "../App";

const ClassInformation = ({config, template, isHeader, isBody, isFooter, usingFooterImg}) => {
    const css = (isHeader) ?  {backgroundColor: config?.header?.colour} : (isBody) ? {backgroundColor: "#fff"} : {backgroundColor: config?.footer?.colour};

    return(
        (isHeader) ?
        <div style={css} className='dates'>
            <div className='templateContainer'>
                <img src={template} alt="template for the dates available" />
                <div className={`textContainer templateText fullHeightWidth`}>
                    <h2>{config?.title}</h2>
                    <h3>{config?.subtitle}</h3>
                    <p className='description'>{config?.description}</p>

                    <span className='middle'>
                        {/* <span className='dateInfo'>
                            {config?.day && config?.month && <h2>{config?.day}, {config?.month}</h2>}
                            {config?.daysAvailable && <h2>{config?.daysAvailable}</h2>}
                        </span>
                        <span className='times'><h2>{config?.times}</h2></span> */}
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
                        {/* <span className='dateInfo'>
                            {config?.day && config?.month && <h2>{config?.day}, {config?.month}</h2>}
                            {config?.daysAvailable && <h2>{config?.daysAvailable}</h2>}
                        </span> */}
                        {/* <span className='times'><h2>{config?.times}</h2></span> */}
                    </span>
                    <span className='bottom spaceTop'>
                        <p>{config?.orgName}</p>
                        <p>{config?.address}</p>
                        {/* {config?.fee && <p>Investment ${config?.fee} per class</p>} */}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ClassInformation;