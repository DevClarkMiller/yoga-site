
const ListPanel = ({config, list}) =>{
    let css = {backgroundColor: config.colour};
    return(
        <div style={css} className="listPanel panel0 generalPanelFlexCol">
            <div className='headerAndP'>
                {config.header && 
                    <h2>{config.header}</h2>
                }
                <p>{config.text}</p>
            </div>
            <ul className="qualificationsUl">
                    {
                        list.map((item) =>(
                            <li key={list.indexOf(item)}>{item.text}</li>
                        ))
                    }
            </ul>
        </div>
    );
}

export default ListPanel;