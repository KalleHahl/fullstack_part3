import { useState, useEffect } from 'react'
import numberServices from './services/numbers'
import Persons from './components/persons'
import PersonForm from './components/personform'
import Filter from './components/filter'
import {Notification, Error} from './components/alert'




const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')

  const [notificationMessage,setNotificationMessage] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    numberServices
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])
  

  const addNumber = (event) => {
    event.preventDefault()
    const inList = persons.map(person => person.name)
  
    

    if (inList.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){

        const person = persons.find(person => person.name === newName)
        const changedNumber = {...person, number: newNumber}
        const id = person.id

        numberServices
          .changeNumber(id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person: returnedPerson))
          })

        setNotificationMessage(`Changed number of ${newName}`)
        setTimeout(() => {
          setNotificationMessage(null)
        },5000)
          
        setNewName('')
        setNewNumber('')
      }
      
      return
    }

    const numberObject = {
      name: newName,
      number: newNumber
    }

    numberServices
      .create(numberObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    
    setNotificationMessage(`Added ${newName}`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
    setNewName('')
    setNewNumber('')
  }

  const deleteNumberOf = (id) => {
    const number = persons.find(number => number.id === id)
    
    if(window.confirm(`Delete ${number.name}`)) {
      numberServices
        .deleteNumber(id)
          .then(alert => {
            setNotificationMessage(`Deleted number of ${number.name}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id))
          })
          .catch(error => {
            setErrorMessage(`Information of ${number.name} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }
          )
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={notificationMessage}/>
      <Error message={errorMessage}/>
      <Filter filter={newFilter} change={handleFilterChange}/>

      <h2>add a new</h2>

      <PersonForm  
        name={newName} 
        number={newNumber} 
        change_name={handleNameChange} 
        change_number={handleNumberChange} 
        action={addNumber}
        />

      <h2>Numbers</h2>
      <Persons persons={persons} action={deleteNumberOf} personFilter={newFilter}/>

    </div>
  )

}

export default App