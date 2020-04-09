import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPickles} from '../store/allPickles'
import {Link} from 'react-router-dom'

class AllPickles extends Component {
  componentDidMount() {
    this.props.loadPickles()
  }

  render() {
    const {pickles, loading, error} = this.props

    if (loading) return <h2> Loading </h2>
    if (error) return <h2> Something went wrong! </h2>

    return (
      <div className="card-columns">
        {pickles.map(pickle => (
          <div className="card" key={pickle.id}>
            <img src={pickle.imageUrl} className="card-img-top" />
            <div className="card-body">
              <p className="card-text">
                <Link to={`/pickles/${pickle.id}`}> {pickle.title} </Link>
              </p>
              <p className="card-text">${(pickle.price / 100).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  pickles: state.allPickles.pickles,
  loading: state.allPickles.loading,
  error: state.allPickles.error
})

const mapDispatch = dispatch => ({
  loadPickles: () => dispatch(fetchPickles())
})

export default connect(mapState, mapDispatch)(AllPickles)
