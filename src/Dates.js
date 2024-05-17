import 'bootstrap/dist/css/bootstrap.min.css'
import './template.css'
const Dates = ({DateConfig, template, isHeader, isBody, isFooter}) =>{
    const css = (isHeader) ?  {backgroundColor: DateConfig.header.colour} : (isBody) ? {backgroundColor: "#fff"} : {backgroundColor: DateConfig.footer.colour};

    return(
        (isHeader) ?
        <div style={css} className='dates'>
            <div className='templateContainer'>
                <img src={template} alt="template for the dates available" />
                <div className={`textContainer templateText fullHeightWidth`}>
                    <h2>{DateConfig.general.title}</h2>
                    <h3>{DateConfig.general.subtitle}</h3>
                    <p className='description'>{DateConfig.general.description}</p>

                    <span className='middle'>
                        <span className='dateInfo'>
                            <h2>{DateConfig.header.day}, {DateConfig.header.month}</h2>
                            <h2>{DateConfig.header.daysAvailable}</h2>
                        </span>
                        <span className='times'><h2>{DateConfig.header.times}</h2></span>
                    </span>
                </div>
            </div>
        </div> : 

        (isBody) ? 
        <div style={css}></div>
        :  
        <div style={css} className='datesFooter borderTopDash'>
           <div className='templateContainer'>
                <div className={`textContainerFooter fullWidth fitHeight`}>
                    <span className='middle'>
                        <span className='dateInfo'>
                            <h2>{DateConfig.footer.day}, {DateConfig.footer.month}</h2>
                            <h2>{DateConfig.footer.daysAvailable}</h2>
                        </span>
                        <span className='times'><h2>{DateConfig.footer.times}</h2></span>
                    </span>
                    <span className='bottom spaceTop'>
                        <p>{DateConfig.general.orgName}</p>
                        <p>{DateConfig.general.location}</p>
                        <p>Investment ${DateConfig.general.fee} per class</p>
                    </span>
                </div>
            </div>
        </div>
        //Only posibility is the dates footer
    );
}

export default Dates;