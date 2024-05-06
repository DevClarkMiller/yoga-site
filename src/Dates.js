import template from './Images/yogaTemplate.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './template.css'

import { Container } from 'react-bootstrap'
const Dates = ({day, month, times, daysAvailable, fee}) =>{
    //Notes, add in dates template functionality
    return(
        <div className='dates'>
            <Container>
                <img className='img-fluid' src={template} alt="template for the dates image" />
            </Container>
        </div>
    )
}

export default Dates;