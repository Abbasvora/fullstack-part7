import React, { useState } from 'react'

import PropTypes from 'prop-types'

const NewBlog = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleCreateBlog({ title, author, url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <>
      <div className="flex mx-10 px-6">
        <form onSubmit={handleSubmit} className="flex flex-col w-64">
          <h2 className="text-center mb-3 font-medium">Create New</h2>
          <div className="mb-2 flex flex-row justify-between">
            Title
            <input
              className="title border-2  rounded-md border-gray-300 bg-gray-100"
              type={'text'}
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div className="mb-2 flex flex-row justify-between">
            Author
            <input
              className="author border-2  rounded-md border-gray-300 bg-gray-100"
              type={'text'}
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div className="flex flex-row justify-between">
            Url
            <input
              className="url border-2  rounded-md border-gray-300 bg-gray-100"
              type={'text'}
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <div>
            <button
              className="create hover:text-white hover:bg-zinc-700 pb-1 ml-6 mt-1.5 px-2.5 border-2 tracking-wider bg-gray-100 font-medium border-gray-300 rounded "
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

NewBlog.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
}

export default NewBlog
