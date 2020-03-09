import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.loadPickles()
  }

  render() {
    const {users} = this.props

    return users.map(user => (
      <div key={user.id}>
        <Link to={`/users/${user.id}`}> {user.email} </Link>${user.nickname}
      </div>
    ))
  }
}

const mapState = state => ({
  users: state.allUsers.users
})

const mapDispatch = dispatch => ({
  loadUsers: () => dispatch(fetch())
})

export default connect(mapState, mapDispatch)(AllUsers)

// import {useSelector, useDispatch} from 'react-redux'
// // import { fetchAllUsers } from './store/allUsers'

// const AllUsers = props => {
//   // const email = useSelector(state => state.users.email)
//   // const nickname = useSelector(state => state.users.nickname)

//   // const dispatch = useDispatch()

//   // useEffect(() => {
//   //   dispatch(fetchAllUsers())
//   // }, [])

//   return (
//     <div>
//       <h1>List Of All Users</h1>
//     </div>
//   )
// }
