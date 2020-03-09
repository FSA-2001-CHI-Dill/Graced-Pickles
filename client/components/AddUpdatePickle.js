import React from 'react'
import {useDispatch} from 'react-redux'
import {addNewPickle} from '../store/allPickles'
import {updateSinglePickle} from '../store/singlePickle'
import PickleForm from './PickleForm'

const AddUpdatePickle = props => {
  const dispatch = useDispatch()

  const onSubmit = data => {
    data.price = Number(data.price).toFixed(2) * 100

    if (props.add) {
      dispatch(addNewPickle(data))
      props.history.push('/pickles')
    } else {
      dispatch(updateSinglePickle(props.pickle.id, data))
    }
  }
  return <PickleForm onSubmit={onSubmit} pickle={props.pickle} />
}

export default AddUpdatePickle
