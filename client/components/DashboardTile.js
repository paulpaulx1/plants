import React, {useState, useEffect} from 'react'
import {
  createProduct,
  deleteProduct,
  updateProduct
} from '../store/adminDashboard'

export const Dashtile = props => {
  const {product, handleSubmit, updatingProduct} = props
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDiscription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [brand, setBrand] = useState('')

  return (
    <form key={product.id} onSubmit={() => handleSubmit()} name={product.name}>
      <>
        <img src={product.imageUrl} height="100" />
        <br />
        <>{product.name}</>
        <button
          type="submit"
          onClick={() => {
            updatingProduct({...product, name: name})
            setName('')
          }}
        >
          Change Name
        </button>
        <input
          name={product.name}
          type="text"
          onChange={e => {
            setName(e.target.value)
          }}
        />
        <br />

        <>{(product.price * 1).toFixed(2)}</>
        <button
          type="submit"
          onClick={() => {
            updatingProduct({
              ...product,
              price: price
            })
            setPrice('')
          }}
        >
          Change Price
        </button>
        <input
          name={product.price}
          type="text"
          onChange={e => {
            setPrice(e.target.value)
          }}
        />
        <br />
        <>{product.imageUrl}</>
        <br />
        <label htmlFor={product.imageUrl} />
        <button
          type="submit"
          onClick={evt => {
            evt.preventDefault()
            updatingProduct({
              ...product,
              imageUrl: imageUrl
            })
            setImageUrl('')
          }}
        >
          Change Image URL ===
        </button>

        <input
          name={product.imageUrl}
          type="text"
          onChange={evt => {
            this.setState({imageUrl: evt.target.value})
          }}
        />
        <br />
        <button
          type="button"
          onClick={() => this.props.deletingProduct(product)}
        >
          DELETE {product.name}
        </button>
        <br />
        <>======================</>
      </>
    </form>
  )
}
