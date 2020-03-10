import React from 'react'
import {useForm} from 'react-hook-form'

const PickleForm = ({onSubmit, pickle}) => {
  const {handleSubmit, register, errors} = useForm()

  //setting default values for two scenarios: 1) edit, 2) add
  const pickleForm = pickle
    ? pickle
    : {
        title: '',
        description: '',
        price: 0,
        inventory: 0,
        imageUrl: '',
        spiceLevel: '',
        Vegetarian: true
      }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        defaultValue={pickleForm.title}
        ref={register({required: true})}
      />
      {errors.title && 'This is required'}

      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        defaultValue={pickleForm.description}
        ref={register({required: true})}
      />
      {errors.description && 'This is required'}

      <label htmlFor="price">Price($)</label>
      <input
        type="number"
        step="any"
        name="price"
        defaultValue={pickleForm.price / 100}
        ref={register({required: true})}
      />
      {errors.price && 'This is required'}

      <label htmlFor="inventory">Inventory</label>
      <input
        type="number"
        name="inventory"
        defaultValue={pickleForm.inventory}
        ref={register({required: true})}
      />
      {errors.inventory && 'This is required'}

      <label htmlFor="imageUrl">Image Url</label>
      <input
        type="text"
        name="imageUrl"
        defaultValue={pickleForm.imageUrl}
        placeholder="select image"
        ref={register}
      />

      <label htmlFor="spiceLevel">Spice level</label>
      <select
        name="spiceLevel"
        defaultValue={pickleForm.spiceLevel}
        ref={register({required: true})}
      >
        <option value="">Select...</option>
        <option value="mild">mild</option>
        <option value="medium">medium</option>
        <option value="spicy">spicy</option>
      </select>
      {errors.spiceLevel && 'This is required'}

      <label htmlFor="vegetarian">Vegetarian</label>
      <input
        type="checkbox"
        name="vegetarian"
        defaultChecked={pickleForm.vegetarian}
        ref={register}
      />

      <button type="submit">Submit</button>
    </form>
  )
}

export default PickleForm
