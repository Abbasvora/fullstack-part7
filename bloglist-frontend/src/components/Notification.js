import React from 'react'
import PropTypes from 'prop-types'
function Notification({ notification }) {
  return (
    <div className=" absolute bg-green-100 rounded-lg py-2 mt-5 mb-3 text-center text-base text-green-700 w-1/4 translate-x-full">
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
}

export default Notification
