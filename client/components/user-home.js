import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, isAdmin} = props
  return (
    <div>
      <h3>Welcome, {email}</h3>
      <p>{isAdmin && <Link to="/pickles/add">Add Pickles</Link>}</p>
      <p>{isAdmin && <Link to="/users"> Show Me All Users </Link>}</p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  isAdmin: PropTypes.bool
}
