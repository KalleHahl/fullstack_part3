const PersonForm = ({name, number, change_number, change_name, action}) => {
    return(
      <form onSubmit={action}>
          <div>
            name: <input value={name} onChange={change_name}/>
          </div>
          <div>
            number: <input value={number} onChange={change_number}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

export default PersonForm