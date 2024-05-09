import template from './Images/yogaTemplateBW.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './template.css'
import DateConfig from './ConfigFiles/DatesConfig.json'
import { useContext } from 'react'
import { RefContext } from './App'

import { Container } from 'react-bootstrap'
const Dates = () =>{

    console.log(DateConfig);
    const context = useContext(RefContext);

    const {datesRef} = context;
    return(
        <div className='dates' ref={datesRef}>
            <div className='templateContainer'>
                <img src={template} alt="template image for the dates available" />
                <div className='textContainer templateText'>
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
                    <span className='bottom'>
                        <p>{DateConfig.orgName}</p>
                        <p>{DateConfig.location}</p>
                        <p>Investment ${DateConfig.fee} per class</p>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Dates;