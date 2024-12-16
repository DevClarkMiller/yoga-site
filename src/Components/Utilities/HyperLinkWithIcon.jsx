const HyperLinkWithIcon = ({onClick, href = '/', icon, children, target = "blank_"}) =>{
    return(<a onClick={onClick} className="!no-underline flex justify-between w-full items-center" href={href} target={target}>
        <div className="flex-grow">{children}</div>
        {icon}
        </a>
    );   
}


export default HyperLinkWithIcon;