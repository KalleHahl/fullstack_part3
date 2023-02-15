const Person = ({name, number, action}) => {
    return(
      <div>
      <p>{name} {number} <button onClick={action}>delete</button></p>
      </div>
    )
  }

export default Person