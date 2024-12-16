const RoundedList = ({title, children}) => {
  return (
    <ul className="justify-center w-1/2 p-0 text-2xl rounded-list">
        {title&& <h2 className="w-full p-3 border-b border-gray-300 font-Poetson">{title}</h2>}
        {children}
    </ul>
  )
}

export default RoundedList;