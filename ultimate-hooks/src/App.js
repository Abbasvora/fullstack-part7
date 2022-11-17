import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const result = await axios.get(baseUrl)
    setResources(result.data)
  }

  const create = async (resource) => {
    const result = await axios.post(baseUrl, resource)
    setResources(resources.concat(result.data))
  }

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(result => setResources(result.data))
      .catch(error => console.log(error))
  }, [baseUrl])
  const service = {
    create,
    getAll
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.reset()
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
    name.reset()
    number.reset()
  }
  const attributes = (content) => {
    const { reset, ...attrs } = content
    return attrs
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...attributes(content)} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...attributes(name)} /> <br />
        number <input {...attributes(number)} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App