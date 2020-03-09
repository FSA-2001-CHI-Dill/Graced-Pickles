import React from 'react'
import {Link} from 'react-router-dom'

import useFetchAllItems from '../../store/useFetchAllItems'

const AllPickles = () => {
  const [state, setParams] = useFetchAllItems('/api/pickles')
  // useFetchAllItems takes an endpoint and returns state and setParams
  // state is an object with status and items
  // setParams take parameters to filter state

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
