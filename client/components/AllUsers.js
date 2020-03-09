import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/allUsers'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    const {users} = this.props
    console.log(users)

    return users.map(user => (
      <div key={user.id}>
        <Link to={`/users/${user.id}`}> {user.email} </Link>
        {user.nickname}
      </div>
    ))
  }
}

const mapState = state => ({
  users: state.users
})

const mapDispatch = dispatch => ({
  loadUsers: () => dispatch(fetchAllUsers())
})

export default connect(mapState, mapDispatch)(AllUsers)
