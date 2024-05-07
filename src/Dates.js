import template from './Images/yogaTemplateBW.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './template.css'

import { Container } from 'react-bootstrap'
const Dates = ({
    title, subtitle, description, day, 
    month, times, daysAvailable, fee, orgName, location
}) =>{
    return(
        <div className='dates'>
            <div className='templateContainer'>
                <img src={template} alt="template image for the dates available" />
                <div className='textContainer templateText'>
                    <h2>{title}</h2>
                    <h3>{subtitle}</h3>
                    <p className='description'>{description}</p>

                    <span className='middle'>
                        <span className='dateInfo'>
                            <h2>{day}, {month}</h2>
                            <h2>{daysAvailable}</h2>
                        </span>
                        <span className='times'><h2>{times}</h2></span>
                    </span>
                    <span className='bottom'>
                        <p>{orgName}</p>
                        <p>{location}</p>
                        <p>Investment ${fee} per class</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Dates;