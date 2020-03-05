import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPickles} from '../store/allPickles'
import {Link} from 'react-router-dom'

class AllPickles extends Component {
  componentDidMount() {
    this.props.loadPickles()
  }

  render() {
    return this.props.pickles.map(pickle => (
      <div key={pickle.id}>
        <Link to={`/pickles/${pickle.id}`}> {pickle.title} </Link>
        {/* REVIEW: consider utility component to display prices
          <FormattedPrice cents={pickle.price}/>
          vs
          {formattedPrice(pickle.price)}
          */}
        ${pickle.price}
      </div>
    ))
  }
}

const mapState = state => ({
  pickles: state.allPickles
})

const mapDispatch = dispatch => ({
  loadPickles: () => dispatch(fetchPickles())
})

export default connect(mapState, mapDispatch)(AllPickles)
