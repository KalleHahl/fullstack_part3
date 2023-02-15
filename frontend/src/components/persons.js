import Person from './person'
const Persons = ({persons, action, personFilter}) => {

    const showThese = persons.filter(person => person.name.toLowerCase().includes(personFilter.toLowerCase()))
  
    return(
      <div>
        {showThese.map(person =>
          <Person key={person.name} name={person.name} number={person.number} action={() => action(person.id)}/>)}
      </div>
    )
    
  }

  export default Persons