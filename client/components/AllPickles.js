import React from 'react'
import {Link} from 'react-router-dom'

import useFetchAllItems from '../hooks/useFetchAllItems'

const AllPickles = () => {
  const {state, setParams, trigger} = useFetchAllItems('/api/pickles')
  // useFetchAllItems takes an endpoint and returns state and setParams
  // state is an object with status and items
  // setParams take parameters to filter state
  // force a rerender by calling trigger

  return (
    <>
      {
        {
          LOADING: <h1>"Loading"</h1>,
          ERROR: state.response,
          SUCCESS: state.response.map(pickle => (
            <div key={pickle.id}>
              <Link to={`/pickles/${pickle.id}`}>{pickle.title}</Link>
              ${pickle.price}
            </div>
          ))
        }[state.status]
      }
    </>
  )
}
// now to style

export default AllPickles
