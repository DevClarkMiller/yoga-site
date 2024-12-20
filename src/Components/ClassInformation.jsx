import { useContext, useEffect } from "react";

// Context
import { RefContext } from "../App";

const ClassInformation = ({template, isHeader, usingFooterImg}) => {
    const { selectedClass, generalData } = useContext(RefContext);
    useEffect(() =>{
        console.log(selectedClass);
    }, [selectedClass]);

    return(
        (isHeader) ?
        <div className='dates'>
            <div className='templateContainer'>
                <img src={template} alt="template for the dates available" />
                <div className={`textContainer templateText fullHeightWidth`}>
                    <h2>{selectedClass?.title}</h2>
                    <h3>{selectedClass?.subtitle}</h3>
                    <p className='description'>{selectedClass?.description}</p>

                </div>
            </div>
        </div> : 

        <div className='datesFooter borderTopDash lg:border-t-0'>
            <div className='templateContainer col-flex-center h-full pt-12 lg:pt-0 md:text-lg lg:text-2xl'>
            {template && <img src={template} alt="template for the dates available" />}
                <div className={`textContainerFooter ${usingFooterImg && 'templateText'} fullWidth fitHeight`}>
                    <span className='middle'>
                        <span className='dateInfo'>
                            {selectedClass?.month && <h2>{selectedClass?.month}</h2>}
                            {selectedClass?.days && <h2>{selectedClass?.days}</h2>}
                        </span> 
                        <span className='times'><h2>{selectedClass?.times}</h2></span>
                    </span>
                    <span className='bottom spaceTop gap-3 font-semibold'>
                        <p>{generalData?.orgName}</p>
                        <p>{selectedClass?.address}</p>
                        {selectedClass?.fee && <p>Investment ${selectedClass?.fee} per class</p>}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ClassInformation;