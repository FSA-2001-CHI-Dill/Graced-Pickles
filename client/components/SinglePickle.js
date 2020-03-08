import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSinglePickle, resetPickles} from '../store/singlePickle'
import {updateCart} from '../store/cart'

class SinglePickle extends Component {
  componentDidMount() {
    const pickleId = this.props.match.params.pickleId
    this.props.loadPickle(pickleId)
  }

  componentWillUnmount() {
    this.props.reset()
  }

  handleClick = pickle => {
    this.props.addToCart(pickle, 1)
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
        <p> Price: ${(pickle.price / 100).toFixed(2)} </p>
        <p> Spice level: {pickle.spiceLevel}</p>
        <p>Vegetarian? {pickle.vegetarian ? '✅' : ''}</p>
        <button type="button" onClick={() => this.handleClick(pickle)}>
          {' '}
          Add to cart
        </button>
        <p>
          Reviews:{' '}
          {pickle.reviews.map(review => (
            <div key={review.id}> {review.content} </div>
          ))}{' '}
        </p>
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
  addToCart: (item, qty) => dispatch(updateCart(item, qty))
})

export default connect(mapState, mapDispatch)(SinglePickle)
