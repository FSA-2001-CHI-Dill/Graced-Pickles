import React from 'react'
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
    const {users, loading, error} = this.props
    console.log(users)

    if (loading) return <h2> Loading </h2>
    if (error) return <h2> Something went wrong! </h2>

    return (
      <div>
        <h1>All Users</h1>
        {users.map(user => (
          <div key={user.id}>
            <h2>User #{user.id}:</h2>
            <h3>{user.email}</h3>
            <p>Administrator? {user.isAdmin ? 'YES' : 'NO'}</p>
            <button type="button" onClick={() => this.makeAdmin(user)}>
              Promote to Admin
            </button>
            <button type="button" onClick={() => this.deleteClick(user)}>
              Remove User
            </button>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  users: state.allUsers.users,
  loading: state.allUsers.loading,
  error: state.allUsers.error
})

const mapDispatch = dispatch => ({
  loadUsers: () => dispatch(fetchAllUsers()),
  deleteUser: user => dispatch(removeUser(user)),
  updateUser: user => dispatch(promoteToAdmin(user))
})

export default connect(mapState, mapDispatch)(AllUsers)
