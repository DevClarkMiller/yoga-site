import template from './Images/yogaTemplateBW.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './template.css'
import { useContext } from 'react'
import { RefContext } from './App'

import { Container } from 'react-bootstrap'
const Dates = ({pageDetails}) =>{

    const context = useContext(RefContext);

    const {datesRef} = context;
    return(
        <div className='dates' ref={datesRef}>
            <div className='templateContainer'>
                <img src={template} alt="template image for the dates available" />
                <div className='textContainer templateText'>
                    <h2>{pageDetails.title}</h2>
                    <h3>{pageDetails.subtitle}</h3>
                    <p className='description'>{pageDetails.description}</p>

                    <span className='middle'>
                        <span className='dateInfo'>
                            <h2>{pageDetails.day}, {pageDetails.month}</h2>
                            <h2>{pageDetails.daysAvailable}</h2>
                        </span>
                        <span className='times'><h2>{pageDetails.times}</h2></span>
                    </span>
                    <span className='bottom'>
                        <p>{pageDetails.orgName}</p>
                        <p>{pageDetails.location}</p>
                        <p>Investment ${pageDetails.fee} per class</p>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Dates;