import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSinglePickle} from '../store/singlePickle'
import {updateCart} from '../store/cart'
import {Link} from 'react-router-dom'
import UpdatePickle from './AddUpdatePickle'

class SinglePickle extends Component {
  constructor() {
    super()
    this.state = {
      toggle: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.toggleClick = this.toggleClick.bind(this)
  }

  componentDidMount() {
    const pickleId = this.props.match.params.pickleId
    this.props.loadPickle(pickleId)
  }

  handleClick = pickle => {
    this.props.addToCart(pickle, 1)
  }

  toggleClick = () => {
    this.setState({toggle: !this.state.toggle})
  }

  render() {
    const {pickle, loading, error} = this.props

    if (loading) return <h2> Loading </h2>
    if (error) return <h2> Pickle does not exist </h2>
    return (
      <div>
        <h1>{pickle.title} </h1>
        <img src={pickle.imageUrl} />
        <p> About this pickle: {pickle.description} </p>
        <p> Price: ${(pickle.price / 100).toFixed(2)} </p>
        <p> Spice level: {pickle.spiceLevel}</p>
        <p> Vegetarian? {pickle.vegetarian ? '✅' : '✖️'}</p>
        <button type="button" onClick={() => this.handleClick(pickle)}>
          {' '}
          Add to cart
        </button>
        <p>
          Reviews:{' '}
          {pickle.reviews &&
            pickle.reviews.map(review => (
              <div key={review.id}> {review.content} </div>
            ))}
        </p>
        <br />
        {this.props.isAdmin && (
          <button type="button" onClick={this.toggleClick}>
            Update this pickle
          </button>
        )}
        {this.state.toggle && <UpdatePickle update={true} pickle={pickle} />}
      </div>
    )
  }
}

const mapState = state => ({
  isAdmin: state.user.isAdmin,
  pickle: state.singlePickle.pickle,
  loading: state.singlePickle.loading,
  error: state.singlePickle.error
})

const mapDispatch = dispatch => ({
  loadPickle: pickleId => dispatch(fetchSinglePickle(pickleId)),
  addToCart: (item, qty) => dispatch(updateCart(item, qty))
})

export default connect(mapState, mapDispatch)(SinglePickle)
