
const mongoose = require('mongoose')

const info = process.argv
console.log(info)

const url = `mongodb+srv://kallehahl:${info[2]}@cluster0.2ombmsk.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (info.length === 3) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('phonebook:')
      Person
        .find({})
        .then(persons => {
          for (let x in persons) {
            console.log(`${persons[x].name} ${persons[x].number}`)
          }
          mongoose.connection.close()
        })
    })

} else if (info.length === 5) {
  mongoose
    .connect(url)
    .then(() => {
      let person =  new Person({
        name: info[3],
        number: info[4]
      })
      return person.save()
    })
    .then(() => {
      console.log(`Added ${info[3]} number ${info[4]} to phonebook`)
      return mongoose.connection.close()
    })
}

