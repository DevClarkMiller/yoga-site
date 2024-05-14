import 'bootstrap/dist/css/bootstrap.min.css'
import './template.css'
const Dates = ({DateConfig, template}) =>{
    return(
        (DateConfig.header) ?
        <div className='dates'>
            <div className='templateContainer'>
                <img src={template} alt="template for the dates available" />
                <div className={`textContainer templateText fullHeightWidth`}>
                    <h2>{DateConfig.title}</h2>
                    <h3>{DateConfig.subtitle}</h3>
                    <p className='description'>{DateConfig.description}</p>

                    <span className='middle'>
                        <span className='dateInfo'>
                            <h2>{DateConfig.day}, {DateConfig.month}</h2>
                            <h2>{DateConfig.daysAvailable}</h2>
                        </span>
                        <span className='times'><h2>{DateConfig.times}</h2></span>
                    </span>
                </div>
            </div>
        </div> : 

        (DateConfig.body) ? 
        <div></div>
        :  
        <div className='datesFooter borderTopDash'>
           <div className='templateContainer'>
                <div className={`textContainerFooter fullWidth fitHeight`}>
                    <span className='middle'>
                        <span className='dateInfo'>
                            <h2>{DateConfig.day}, {DateConfig.month}</h2>
                            <h2>{DateConfig.daysAvailable}</h2>
                        </span>
                        <span className='times'><h2>{DateConfig.times}</h2></span>
                    </span>
                    <span className='bottom spaceTop'>
                        <p>{DateConfig.orgName}</p>
                        <p>{DateConfig.location}</p>
                        <p>Investment ${DateConfig.fee} per class</p>
                    </span>
                </div>
            </div>
        </div>
        //Only posibility is the dates footer
    );
}

export default Dates;