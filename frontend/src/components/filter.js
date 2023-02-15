const Filter = ({filter, change}) => {
    return(
      <div>
        filter shown with
        <input value={filter} onChange={change}/>
      </div>
    )
  }

  export default Filter