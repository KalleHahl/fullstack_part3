const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('data',(req,res) => {
    if (req === 'POST') {
        JSON.stringify(req.body)
    }
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())
app.use(express.static('build'))



let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
}

const generateID = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => person.id))
        : 0
    
    return randomNumber(maxId+1, 1000)
}

app.get('/info', (request, response) => {
    const amount = persons.length
    const date = new Date()
    response.send(`<div>
    Phonebook has info for ${amount} people
    </div>
    <div>
    ${date}
    </div>`)

})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    
        

    if (!body.name || !body.number) {
        console.log("no name or number")
        return res.status(400).json({
            error: "number or name missing"
        })
    }

    if (persons.some(person => person.name === body.name)) {
        console.log("name exists")
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        id: generateID(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server runnning on port ${PORT}`)
})