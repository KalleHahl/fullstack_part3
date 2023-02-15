import axios from "axios"

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteNumber = id => {
    const request = axios.delete(baseUrl+`/${id}`)
    return request.then(response => response.data)
}

const changeNumber = (id, changedNumber) => {
    const request = axios.put(baseUrl+`/${id}`, changedNumber)
    return request.then(response => response.data)
}
export default{getAll, create, deleteNumber, changeNumber} 