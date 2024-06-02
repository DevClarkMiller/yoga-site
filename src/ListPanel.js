const ListPanel = ({config}) =>{
    let css = {backgroundColor: config.colour};
    return(
        <div style={css} className="listPanel panel0 generalPanelFlexCol">
            <div className='headerAndP'>
                {config.header && 
                    <h2>{config.header}</h2>
                }
                <p> am extremely grateful to my amazing teachers, for sharing their passion and deep wisdom, inspiring my teaching and my life.</p>
         
            </div>
            <ul>
                <li>300-Hour Advanced Yoga Teacher Training</li>
                <li>Your Yoga Flow 200-Hour Yoga Teacher Training</li>
                <li>Your Yoga Flow Restorative Yoga Teacher</li>
                <li>Training Tianne Allan</li>
            </ul>
        </div>
    );
}

export default ListPanel;