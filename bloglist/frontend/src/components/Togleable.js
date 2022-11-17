import React, { forwardRef, useImperativeHandle, useState } from 'react'

import PropTypes from 'prop-types'

const Togleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })
  return (
    <div className=" grid grid-flow-row justify-center mb-5">
      <div style={hideWhenVisible}>
        <button
          onClick={toggleVisibility}
          className="hover:text-white hover:bg-zinc-700 border-2 tracking-wider bg-gray-100 font-medium px-2.5 border-gray-300 rounded justify-self-center"
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          onClick={toggleVisibility}
          className="hover:text-white hover:bg-zinc-700 border-2 tracking-wider bg-gray-100 font-medium px-2.5 border-gray-300 rounded justify-self-center"
        >
          Cancel
        </button>
      </div>
    </div>
  )
})

Togleable.displayName = 'Togleable'
Togleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.element,
}
export default Togleable
