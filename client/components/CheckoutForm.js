import React from 'react'
import {useForm} from 'react-hook-form'

const CheckoutForm = ({onSubmit}) => {
  const {handleSubmit, register, errors} = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName">First Name</label>
      <input type="text" name="firstName" ref={register({required: true})} />
      {errors.title && 'This is required'}

      <label htmlFor="lastName">Last Name</label>
      <input type="text" name="lastName" ref={register({required: true})} />
      {errors.description && 'This is required'}

      <label htmlFor="address">Address</label>
      <input
        type="number"
        step="any"
        name="address"
        ref={register({required: true})}
      />
      {errors.price && 'This is required'}

      <button type="submit">Submit</button>
    </form>
  )
}

export default CheckoutForm
