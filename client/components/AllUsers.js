import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllUsers, removeUser, promoteToAdmin} from '../store/allUsers'

class AllUsers extends React.Component {
  constructor() {
    super()
    this.deleteClick = this.deleteClick.bind(this)
    this.makeAdmin = this.makeAdmin.bind(this)
  }
  componentDidMount() {
    this.props.loadUsers()
  }

  deleteClick = user => {
    this.props.deleteUser(user)
    this.props.history.push('/users')
  }

  makeAdmin = user => {
    this.props.updateUser(user)
    this.props.history.push('/users')
  }

  render() {
    const {users} = this.props

    return users.map(user => (
      <div key={user.id}>
        <p>User #{user.id}:</p>
        <Link to={`/users/${user.id}`}> {user.email} </Link>
        <p>Adminstrator? {user.isAdmin ? 'YES' : 'NO'}</p>
        <button type="button" onClick={() => this.makeAdmin(user)}>
          Promote to Admin
        </button>
        <button type="button" onClick={() => this.deleteClick(user)}>
          Remove User
        </button>
      </div>
    ))
  }
}

const mapState = state => ({
  users: state.users
})

const mapDispatch = dispatch => ({
  loadUsers: () => dispatch(fetchAllUsers()),
  deleteUser: user => dispatch(removeUser(user)),
  updateUser: user => dispatch(promoteToAdmin(user))
})

export default connect(mapState, mapDispatch)(AllUsers)
