import { useContext } from "react";

// Context
import { RefContext } from "../App";

const ClassInformation = ({template, isHeader, isBody, isFooter, usingFooterImg}) => {
    const { selectedLocation, selectedClass, generalData } = useContext(RefContext);

    return(
        (isHeader) ?
        <div className='dates'>
            <div className='templateContainer'>
                <img src={template} alt="template for the dates available" />
                <div className={`textContainer templateText fullHeightWidth`}>
                    <h2>{selectedClass?.title}</h2>
                    <h3>{selectedClass?.subtitle}</h3>
                    <p className='description'>{selectedClass?.description}</p>

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
        <div></div>
        :  
        //Only remaining posibility is the dates footer
        <div className='datesFooter borderTopDash'>
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
                        <p>{generalData?.orgName}</p>
                        <p>{selectedLocation?.address}</p>
                        {selectedClass?.fee && <p>Investment ${selectedClass?.fee} per class</p>}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ClassInformation;