import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSinglePickle, resetPickles} from '../store/singlePickle'
import {addToCart} from '../store/cart'
import {userAddsToCart} from '../store/user'

class SinglePickle extends Component {
  componentDidMount() {
    const pickleId = this.props.match.params.pickleId
    this.props.loadPickle(pickleId)
  }

  componentWillUnmount() {
    this.props.reset()
  }

  handleClick = pickle => {
    if (this.props.isLoggedIn) {
      this.props.userAddsToCart(this.props.user.id, pickle)
    } else {
      this.props.addPicklesToCart(pickle.id)
    }
  }

  render() {
    const {pickle} = this.props

    if (pickle.status === 404) return <h2> Pickle does not exist </h2>
    if (!pickle.id) return <h2> Loading </h2>

    return (
      <div>
        <h1>{pickle.title} </h1>
        <img src={pickle.imageUrl} />
        <p> About this pickle: {pickle.description} </p>
        <p> Price: ${pickle.price} </p>
        <button type="button" onClick={() => this.handleClick(pickle)}>
          {' '}
          Add to cart
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  pickle: state.singlePickle,
  isLoggedIn: !!state.user.id
})

const mapDispatch = dispatch => ({
  loadPickle: pickleId => dispatch(fetchSinglePickle(pickleId)),
  reset: () => dispatch(resetPickles()),
  addPicklesToCart: id => {
    dispatch(addToCart(id))
  },
  userAddsToCart: (userId, item) => dispatch(userAddsToCart(userId, item))
})

export default connect(mapState, mapDispatch)(SinglePickle)
