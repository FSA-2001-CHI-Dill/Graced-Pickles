import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSinglePickle, resetPickles} from '../store/singlePickle'

class SinglePickle extends Component {
  componentDidMount() {
    const pickleId = this.props.match.params.pickleId
    this.props.loadPickle(pickleId)
  }

  componentWillUnmount() {
    this.props.reset()
  }

  render() {
    const {pickle} = this.props

    if (pickle.status === 404) return <h2> Pickle does not exist </h2>
    if (!pickle.id) return <h2> Loading </h2>

    return (
      <div>
        <h1>{pickle.title} </h1>
        <p> {pickle.imageUrl} </p>
        <p> About this pickle: {pickle.description} </p>
        <p> Price: ${pickle.price} </p>
        <button type="button"> Add to cart</button>
      </div>
    )
  }
}

const mapState = state => ({
  pickle: state.singlePickle
})

const mapDispatch = dispatch => ({
  loadPickle: pickleId => dispatch(fetchSinglePickle(pickleId)),
  reset: () => dispatch(resetPickles())
})

export default connect(mapState, mapDispatch)(SinglePickle)
